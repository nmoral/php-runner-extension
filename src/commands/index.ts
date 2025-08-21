import * as vscode from 'vscode';
import { DockerService } from '../services/dockerService';
import { ConfigurationService } from '../services/configurationService';
import { COMMAND_IDS, MESSAGES } from '../constants';
import { SavedCommand } from '../types';

export class CommandManager {
    private dockerService: DockerService;
    private configurationService: ConfigurationService;
    private output: vscode.OutputChannel;

    constructor(output: vscode.OutputChannel) {
        this.output = output;
        this.dockerService = new DockerService(output);
        this.configurationService = new ConfigurationService(output);
    }

    registerCommands(context: vscode.ExtensionContext): void {
        const commands = [
            vscode.commands.registerCommand(COMMAND_IDS.RUN_COMMAND, this.runCustomCommand.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.CLEAR_CACHE, this.clearCache.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.RUN_TESTS, this.runTests.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.CONFIGURE_CONTAINER, this.configureContainer.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.EXPLORE_FILES, this.exploreFiles.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.BROWSE_CONTAINER, this.browseContainer.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.PICK_DOCKER_COMPOSE_PATH, this.pickDockerComposePath.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.PICK_SERVICE_NAME, this.pickServiceName.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.RUN_SAVED_COMMAND, this.runSavedCommand.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.ADD_SAVED_COMMAND, this.addSavedCommand.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.EDIT_SAVED_COMMAND, this.editSavedCommand.bind(this)),
            vscode.commands.registerCommand(COMMAND_IDS.DELETE_SAVED_COMMAND, this.deleteSavedCommand.bind(this))
        ];

        context.subscriptions.push(...commands);
    }

    private async runSavedCommand(arg?: any): Promise<void> {
        let item: SavedCommand | undefined;
        if (arg && typeof arg === 'object') {
            if ('saved' in arg) {
                item = (arg as any).saved as SavedCommand;
            }
        }

        const saved = this.configurationService.getSavedCommands();
        if (!item) {
            if (!saved || saved.length === 0) {
                vscode.window.showInformationMessage('Aucune commande enregistrée. Utilisez "Ajouter une commande enregistrée".');
                return;
            }
            const picked = await vscode.window.showQuickPick(
                saved.map(s => ({ label: s.label, description: s.command ? s.command : (s.steps ? `${s.steps.length} étape(s)` : ''), value: s })),
                { placeHolder: 'Sélectionnez une commande enregistrée à exécuter' }
            );
            if (!picked) { return; }
            item = picked.value as SavedCommand;
        }

        if (item.steps && item.steps.length > 0) {
            for (const step of item.steps) {
                await this.executeDockerCommand(step);
            }
        } else if (item.command) {
            await this.executeDockerCommand(item.command);
        } else {
            vscode.window.showErrorMessage('Commande enregistrée invalide.');
        }
    }

    private async addSavedCommand(): Promise<void> {
        const choice = await vscode.window.showQuickPick([
            { label: 'Commande simple', value: 'single' },
            { label: 'Séquence de commandes', value: 'sequence' }
        ], { placeHolder: 'Quel type de commande souhaitez-vous ajouter ?' });
        if (!choice) { return; }

        const label = await vscode.window.showInputBox({ prompt: 'Nom de la commande', placeHolder: 'ex: Vider le cache + migrations' });
        if (!label) { return; }

        if (choice.value === 'single') {
            const cmd = await vscode.window.showInputBox({ prompt: 'Commande à exécuter', placeHolder: 'ex: bin/console cache:clear' });
            if (!cmd) { return; }
            await this.configurationService.addSavedCommand({ label, command: cmd });
            vscode.window.showInformationMessage(`Commande enregistrée: ${label}`);
            return;
        }

        // sequence
        const steps: string[] = [];
        while (true) {
            const step = await vscode.window.showInputBox({ prompt: `Étape ${steps.length + 1} (laisser vide pour terminer)`, placeHolder: 'ex: bin/console doctrine:migrations:migrate --no-interaction' });
            if (!step) { break; }
            steps.push(step);
        }
        if (steps.length === 0) { return; }
        await this.configurationService.addSavedCommand({ label, steps });
        vscode.window.showInformationMessage(`Séquence enregistrée: ${label} (${steps.length} étape(s))`);
    }

    private async editSavedCommand(arg?: any): Promise<void> {
        const list = this.configurationService.getSavedCommands();
        let index = -1;
        let existing: SavedCommand | undefined;
        if (arg && typeof arg === 'object') {
            if ('index' in arg && typeof arg.index === 'number') { index = arg.index; }
            if ('saved' in arg) { existing = arg.saved as SavedCommand; }
        }
        if (index < 0 || !existing) {
            const picked = await vscode.window.showQuickPick(
                list.map((s, i) => ({ label: s.label, description: s.command ? s.command : (s.steps ? `${s.steps.length} étape(s)` : ''), value: i })),
                { placeHolder: 'Sélectionnez la commande à modifier' }
            );
            if (!picked) { return; }
            index = picked.value as number;
            existing = list[index];
        }

        if (!existing) { return; }

        const newLabel = await vscode.window.showInputBox({ prompt: 'Nom de la commande', value: existing.label });
        if (!newLabel) { return; }

        const typeChoice = await vscode.window.showQuickPick([
            { label: 'Commande simple', value: 'single' },
            { label: 'Séquence de commandes', value: 'sequence' }
        ], { placeHolder: 'Type de commande', ignoreFocusOut: true });
        if (!typeChoice) { return; }

        if (typeChoice.value === 'single') {
            const cmd = await vscode.window.showInputBox({ prompt: 'Commande', value: existing.command || '' });
            if (!cmd) { return; }
            await this.configurationService.updateSavedCommandAt(index, { label: newLabel, command: cmd });
            vscode.window.showInformationMessage('Commande mise à jour');
            return;
        }

        // sequence
        const steps: string[] = [...(existing.steps || [])];
        while (true) {
            const editChoice = await vscode.window.showQuickPick([
                { label: 'Ajouter une étape', value: 'add' },
                { label: 'Supprimer une étape', value: 'remove' },
                { label: 'Réinitialiser les étapes', value: 'reset' },
                { label: 'Terminer', value: 'done' }
            ], { placeHolder: `Étapes: ${steps.length}. Choisissez une action.` });
            if (!editChoice || editChoice.value === 'done') { break; }
            if (editChoice.value === 'reset') { steps.splice(0, steps.length); continue; }
            if (editChoice.value === 'add') {
                const step = await vscode.window.showInputBox({ prompt: `Nouvelle étape #${steps.length + 1}` });
                if (step) { steps.push(step); }
            } else if (editChoice.value === 'remove') {
                if (steps.length === 0) { continue; }
                const pickIndex = await vscode.window.showQuickPick(steps.map((s, i) => ({ label: s, value: i })), { placeHolder: 'Quelle étape supprimer ?' });
                if (pickIndex) { steps.splice(pickIndex.value as number, 1); }
            }
        }
        if (steps.length === 0) { return; }
        await this.configurationService.updateSavedCommandAt(index, { label: newLabel, steps });
        vscode.window.showInformationMessage('Séquence mise à jour');
    }

    private async deleteSavedCommand(arg?: any): Promise<void> {
        const list = this.configurationService.getSavedCommands();
        let index = -1;
        if (arg && typeof arg === 'object' && 'index' in arg && typeof arg.index === 'number') {
            index = arg.index;
        }
        if (index < 0) {
            const picked = await vscode.window.showQuickPick(
                list.map((s, i) => ({ label: s.label, description: s.command ? s.command : (s.steps ? `${s.steps.length} étape(s)` : ''), value: i })),
                { placeHolder: 'Sélectionnez la commande à supprimer' }
            );
            if (!picked) { return; }
            index = picked.value as number;
        }
        const confirm = await vscode.window.showWarningMessage('Supprimer cette commande enregistrée ?', { modal: true }, 'Supprimer');
        if (confirm !== 'Supprimer') { return; }
        await this.configurationService.deleteSavedCommandAt(index);
        vscode.window.showInformationMessage('Commande supprimée');
    }

    private async runCustomCommand(): Promise<void> {
        const command = await vscode.window.showInputBox({
            prompt: 'Entrez la commande PHP à exécuter (ex: bin/console cache:clear)',
            placeHolder: 'bin/console cache:clear'
        });

        if (command) {
            await this.executeDockerCommand(command);
        }
    }

    private async clearCache(): Promise<void> {
        await this.executeDockerCommand('bin/console cache:clear');
    }

    private async runTests(): Promise<void> {
        await this.executeDockerCommand('bin/phpunit');
    }

    private async configureContainer(): Promise<void> {
        await this.configurationService.configureContainer();
    }

    private async exploreFiles(): Promise<void> {
        try {
            const config = this.configurationService.getDockerConfiguration();
            
            if (!this.isConfigurationValid(config)) {
                vscode.window.showErrorMessage(MESSAGES.CONFIGURATION_REQUIRED);
                return;
            }

            // Ouvrir l'explorateur de fichiers du workspace
            await vscode.commands.executeCommand('workbench.action.files.openFolder');
            
        } catch (error: any) {
            const errorMessage = `Erreur lors de l'exploration des fichiers: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            vscode.window.showErrorMessage(errorMessage);
        }
    }

    private async browseContainer(): Promise<void> {
        try {
            const config = this.configurationService.getDockerConfiguration();
            
            if (!this.isConfigurationValid(config)) {
                vscode.window.showErrorMessage(MESSAGES.CONFIGURATION_REQUIRED);
                return;
            }

            if (config.containerName) {
                await this.dockerService.exploreContainerDirectory(config.containerName);
            } else if (config.serviceName) {
                // Pour les services docker-compose, on doit d'abord obtenir le nom du container
                const containerName = await this.getContainerNameFromService(config.serviceName, config.dockerComposePath);
                if (containerName) {
                    await this.dockerService.exploreContainerDirectory(containerName);
                } else {
                    vscode.window.showErrorMessage('Impossible de déterminer le nom du container pour ce service');
                }
            }

        } catch (error: any) {
            const errorMessage = `Erreur lors de la navigation dans le container: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            vscode.window.showErrorMessage(errorMessage);
        }
    }

    private async executeDockerCommand(command: string): Promise<void> {
        try {
            const config = this.configurationService.getDockerConfiguration();
            
            if (!this.isConfigurationValid(config)) {
                vscode.window.showErrorMessage(MESSAGES.CONFIGURATION_REQUIRED);
                return;
            }

            await this.dockerService.executeCommand(command, config);
            vscode.window.showInformationMessage(`${MESSAGES.COMMAND_SUCCESS}: ${command}`);

        } catch (error: any) {
            const errorMessage = `Erreur lors de l'exécution de la commande: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            vscode.window.showErrorMessage(errorMessage);
        }
    }

    private isConfigurationValid(config: any): boolean {
        return !!(config.containerName || config.serviceName);
    }

    private async getContainerNameFromService(serviceName: string, dockerComposePath?: string): Promise<string | undefined> {
        try {
            const { exec } = require('child_process');
            const { promisify } = require('util');
            const execAsync = promisify(exec);

            let command: string;
            if (dockerComposePath) {
                command = `docker compose -f "${dockerComposePath}" ps -q ${serviceName}`;
            } else {
                command = `docker compose ps -q ${serviceName}`;
            }

            const { stdout } = await execAsync(command);
            const containerId = stdout.trim();
            
            if (containerId) {
                // Obtenir le nom du container à partir de l'ID
                const { stdout: nameOutput } = await execAsync(`docker inspect --format='{{.Name}}' ${containerId}`);
                return nameOutput.trim().replace(/^\//, ''); // Enlever le '/' initial
            }

            return undefined;
        } catch (error) {
            this.output.appendLine(`Erreur lors de la récupération du nom du container: ${error}`);
            return undefined;
        }
    }

    private async pickDockerComposePath(settingId?: string): Promise<void> {
        try {
            const picked = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                openLabel: 'Sélectionner',
                filters: { YAML: ['yml', 'yaml'], Tous: ['*'] }
            });

            if (!picked || picked.length === 0) {
                return;
            }

            const fullPath = picked[0].fsPath;

            const targetSettingId = settingId || 'dockerPhpRunner.dockerComposePath';
            const [section, ...rest] = targetSettingId.split('.');
            const key = rest.join('.') || 'dockerComposePath';

            const config = vscode.workspace.getConfiguration(section);
            await config.update(key, fullPath, vscode.ConfigurationTarget.Workspace);
            vscode.window.showInformationMessage('Chemin docker-compose mis à jour.');
        } catch (error: any) {
            const errorMessage = `Erreur lors de la sélection de fichier: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            vscode.window.showErrorMessage(errorMessage);
        }
    }

    private async pickServiceName(): Promise<void> {
        try {
            const config = this.configurationService.getDockerConfiguration();

            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
                return;
            }

            const dockerComposePath = config.dockerComposePath && config.dockerComposePath.trim().length > 0
                ? config.dockerComposePath
                : require('path').join(workspaceFolder.uri.fsPath, 'docker-compose.yml');

            const services = require('../utils/fileUtils').FileUtils.parseDockerComposeServices(dockerComposePath);
            if (services.length === 0) {
                vscode.window.showErrorMessage(MESSAGES.NO_SERVICE_FOUND);
                return;
            }

            const items = [
                ...services.map((s: string) => ({ label: s, description: 'Service Docker', value: s })),
                { label: '✏️ Saisir manuellement...', description: 'Entrer un nom de service personnalisé', value: '__custom__' }
            ];

            const picked = await vscode.window.showQuickPick(items, {
                placeHolder: 'Sélectionnez le service à utiliser',
                matchOnDescription: true
            });

            if (!picked) {
                return;
            }

            let serviceName = picked.value;
            if (picked.value === '__custom__') {
                const manual = await vscode.window.showInputBox({
                    prompt: 'Nom du service',
                    placeHolder: 'ex: app'
                });
                serviceName = manual?.trim();
            }

            if (!serviceName) {
                return;
            }

            const configEditor = vscode.workspace.getConfiguration('dockerPhpRunner');
            await configEditor.update('serviceName', serviceName, vscode.ConfigurationTarget.Workspace);
            vscode.window.showInformationMessage(`Service sélectionné: ${serviceName}`);
        } catch (error: any) {
            const errorMessage = `Erreur lors de la sélection du service: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            vscode.window.showErrorMessage(errorMessage);
        }
    }
}
