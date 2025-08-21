import * as vscode from 'vscode';
import { DockerConfiguration, SavedCommand } from '../types';
import { COMMON_WORKING_DIRS, COMMON_PHP_EXECUTABLES, MESSAGES } from '../constants';
import { FileUtils } from '../utils/fileUtils';
import * as path from 'path';

export class ConfigurationService {
    private output: vscode.OutputChannel;

    constructor(output: vscode.OutputChannel) {
        this.output = output;
    }

    getDockerConfiguration(): DockerConfiguration {
        const config = vscode.workspace.getConfiguration('dockerPhpRunner');
        return {
            containerName: config.get<string>('containerName'),
            serviceName: config.get<string>('serviceName'),
            workingDirectory: config.get<string>('workingDirectory', '/var/www/html'),
            phpExecutable: config.get<string>('phpExecutable', 'php'),
            dockerComposePath: config.get<string>('dockerComposePath', ''),
            dockerUser: config.get<string>('dockerUser', '')
        };
    }

    getSavedCommands(): SavedCommand[] {
        const config = vscode.workspace.getConfiguration('dockerPhpRunner');
        const items = config.get<any[]>('savedCommands', []);
        return (items || []).filter(Boolean);
    }

    async addSavedCommand(command: SavedCommand): Promise<void> {
        const config = vscode.workspace.getConfiguration('dockerPhpRunner');
        const existing = this.getSavedCommands();
        existing.push(command);
        await config.update('savedCommands', existing, vscode.ConfigurationTarget.Workspace);
    }

    async replaceSavedCommands(commands: SavedCommand[]): Promise<void> {
        const config = vscode.workspace.getConfiguration('dockerPhpRunner');
        await config.update('savedCommands', commands, vscode.ConfigurationTarget.Workspace);
    }

    async updateSavedCommandAt(index: number, updated: SavedCommand): Promise<void> {
        const list = this.getSavedCommands();
        if (index < 0 || index >= list.length) { return; }
        list[index] = updated;
        await this.replaceSavedCommands(list);
    }

    async deleteSavedCommandAt(index: number): Promise<void> {
        const list = this.getSavedCommands();
        if (index < 0 || index >= list.length) { return; }
        list.splice(index, 1);
        await this.replaceSavedCommands(list);
    }

    async configureContainer(): Promise<void> {
        try {
            const workspaceFolder = this.getWorkspaceFolder();
            if (!workspaceFolder) {
                return;
            }

            const dockerComposePath = await this.selectDockerComposeFile(workspaceFolder);
            if (!dockerComposePath) {
                return;
            }

            const services = FileUtils.parseDockerComposeServices(dockerComposePath);
            if (services.length === 0) {
                vscode.window.showErrorMessage(MESSAGES.NO_SERVICE_FOUND);
                return;
            }

            const selectedService = await this.selectService(services, dockerComposePath);
            if (!selectedService) {
                return;
            }

            const workingDir = await this.selectWorkingDirectory();
            if (!workingDir) {
                return;
            }

            const phpExecutable = await this.selectPhpExecutable();
            if (!phpExecutable) {
                return;
            }

            const dockerUser = await this.selectDockerUser();
            if (!dockerUser) {
                return;
            }

            await this.saveConfiguration(selectedService, workingDir, phpExecutable, dockerComposePath, dockerUser);
            this.displayConfigurationSummary(selectedService, workingDir, phpExecutable, dockerComposePath, dockerUser);

        } catch (error: any) {
            const errorMessage = `Erreur lors de la configuration: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            vscode.window.showErrorMessage(errorMessage);
        }
    }

    private getWorkspaceFolder(): vscode.WorkspaceFolder | undefined {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(MESSAGES.NO_WORKSPACE);
        }
        return workspaceFolder;
    }

    private async selectDockerComposeFile(workspaceFolder: vscode.WorkspaceFolder): Promise<string | undefined> {
        const fileSelectionOptions = [
            '📁 Parcourir et sélectionner un fichier...',
            '🔍 Utiliser le fichier par défaut du workspace',
            '📋 Sélectionner depuis une liste de fichiers existants',
            '✏️ Saisir le chemin manuellement'
        ];

        const selectionChoice = await vscode.window.showQuickPick(fileSelectionOptions, {
            placeHolder: 'Comment souhaitez-vous sélectionner le fichier docker-compose ?'
        });

        if (!selectionChoice) {
            return undefined;
        }

        switch (selectionChoice) {
            case fileSelectionOptions[0]:
                return await this.browseForDockerComposeFile(workspaceFolder);
            case fileSelectionOptions[1]:
                return path.join(workspaceFolder.uri.fsPath, 'docker-compose.yml');
            case fileSelectionOptions[2]:
                return await this.selectFromExistingFiles(workspaceFolder);
            case fileSelectionOptions[3]:
                return await this.inputDockerComposePath();
            default:
                return undefined;
        }
    }

    private async browseForDockerComposeFile(workspaceFolder: vscode.WorkspaceFolder): Promise<string | undefined> {
        return await FileUtils.browseForFile(workspaceFolder, {
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            openLabel: 'Sélectionner docker-compose.yml',
            filters: {
                'dockerCompose': ['yml', 'yaml'],
                'allFiles': ['*']
            }
        });
    }

    private async selectFromExistingFiles(workspaceFolder: vscode.WorkspaceFolder): Promise<string | undefined> {
        const existingPaths = FileUtils.findExistingDockerComposeFiles(workspaceFolder);
        
        if (existingPaths.length === 0) {
            vscode.window.showWarningMessage(MESSAGES.NO_DOCKER_COMPOSE_FOUND);
            return await this.inputDockerComposePath();
        }

        const selectedPath = await vscode.window.showQuickPick(
            [
                ...existingPaths.map(p => ({ label: `✅ ${p}`, description: 'Fichier existant', value: p })),
                { label: '✏️ Autre chemin...', description: 'Saisir un chemin personnalisé', value: 'custom' }
            ],
            {
                placeHolder: 'Sélectionnez un fichier docker-compose existant ou saisissez un chemin personnalisé'
            }
        );

        if (!selectedPath) {
            return undefined;
        }

        if (selectedPath.value === 'custom') {
            return await this.inputDockerComposePath();
        }

        return selectedPath.value;
    }

    private async inputDockerComposePath(): Promise<string | undefined> {
        const config = vscode.workspace.getConfiguration('dockerPhpRunner');
        const currentPath = config.get<string>('dockerComposePath', '');

        const customPath = await vscode.window.showInputBox({
            prompt: 'Chemin vers le fichier docker-compose.yml',
            value: currentPath,
            placeHolder: 'ex: /path/to/docker-compose.yml',
            validateInput: FileUtils.validateFilePath
        });

        return customPath?.trim();
    }

    private async selectService(services: string[], dockerComposePath: string): Promise<string | undefined> {
        const items = [
            ...services.map(s => ({ label: s, description: 'Service Docker', detail: `Service trouvé dans ${path.basename(dockerComposePath)}`, value: s })),
            { label: '✏️ Saisir manuellement...', description: 'Entrer un nom de service personnalisé', value: '__custom__' }
        ];

        const picked = await vscode.window.showQuickPick(items, {
            placeHolder: 'Sélectionnez le service PHP à utiliser ou saisissez un nom personnalisé',
            matchOnDescription: true,
            matchOnDetail: true
        });

        if (!picked) {
            return undefined;
        }

        if (picked.value === '__custom__') {
            const manual = await vscode.window.showInputBox({
                prompt: 'Nom du service (autocomplétion disponible via la liste précédente)',
                placeHolder: 'ex: app'
            });
            return manual?.trim();
        }

        return picked.value;
    }

    private async selectWorkingDirectory(): Promise<string | undefined> {
        const workingDir = await vscode.window.showQuickPick(
            [
                ...COMMON_WORKING_DIRS.map(dir => ({ label: dir, description: 'Répertoire de travail commun', value: dir })),
                { label: '✏️ Autre...', description: 'Saisir un répertoire personnalisé', value: 'custom' }
            ],
            {
                placeHolder: 'Sélectionnez le répertoire de travail dans le container'
            }
        );

        if (!workingDir) {
            return undefined;
        }

        if (workingDir.value === 'custom') {
            const customWorkingDir = await vscode.window.showInputBox({
                prompt: 'Répertoire de travail personnalisé dans le container',
                placeHolder: '/var/www/html'
            });
            return customWorkingDir;
        }

        return workingDir.label;
    }

    private async selectPhpExecutable(): Promise<string | undefined> {
        const phpExecutable = await vscode.window.showQuickPick(
            [
                ...COMMON_PHP_EXECUTABLES.map(php => ({ label: php, description: 'Exécutable PHP commun', value: php })),
                { label: '✏️ Autre...', description: 'Saisir un exécutable personnalisé', value: 'custom' }
            ],
            {
                placeHolder: 'Sélectionnez l\'exécutable PHP'
            }
        );

        if (!phpExecutable) {
            return undefined;
        }

        if (phpExecutable.value === 'custom') {
            const customPhpExecutable = await vscode.window.showInputBox({
                prompt: 'Chemin vers l\'exécutable PHP personnalisé',
                placeHolder: 'php'
            });
            return customPhpExecutable;
        }

        return phpExecutable.label;
    }

    private async selectDockerUser(): Promise<string | undefined> {
        const commonUsers = [
            { label: 'root', description: 'Utilisateur root (par défaut)', value: 'root' },
            { label: 'www-data', description: 'Utilisateur web standard', value: 'www-data' },
            { label: '1000:1000', description: 'UID:GID standard pour développement', value: '1000:1000' },
            { label: '1000', description: 'UID standard pour développement', value: '1000' },
            { label: '✏️ Autre...', description: 'Saisir un utilisateur personnalisé', value: 'custom' }
        ];

        const dockerUser = await vscode.window.showQuickPick(commonUsers, {
            placeHolder: 'Sélectionnez l\'utilisateur Docker à utiliser'
        });

        if (!dockerUser) {
            return undefined;
        }

        if (dockerUser.value === 'custom') {
            const customUser = await vscode.window.showInputBox({
                prompt: 'Nom de l\'utilisateur Docker personnalisé',
                placeHolder: 'ex: app, 1001:1001, etc.'
            });
            return customUser?.trim();
        }

        return dockerUser.value;
    }

    private async saveConfiguration(
        serviceName: string, 
        workingDirectory: string, 
        phpExecutable: string, 
        dockerComposePath: string,
        dockerUser: string
    ): Promise<void> {
        const config = vscode.workspace.getConfiguration('dockerPhpRunner');
        
        await Promise.all([
            config.update('serviceName', serviceName, vscode.ConfigurationTarget.Workspace),
            config.update('workingDirectory', workingDirectory, vscode.ConfigurationTarget.Workspace),
            config.update('phpExecutable', phpExecutable, vscode.ConfigurationTarget.Workspace),
            config.update('dockerComposePath', dockerComposePath, vscode.ConfigurationTarget.Workspace),
            config.update('dockerUser', dockerUser, vscode.ConfigurationTarget.Workspace)
        ]);
    }

    private displayConfigurationSummary(
        serviceName: string, 
        workingDirectory: string, 
        phpExecutable: string, 
        dockerComposePath: string,
        dockerUser: string
    ): void {
        this.output.appendLine(`Configuration sauvegardée:`);
        this.output.appendLine(`Service: ${serviceName}`);
        this.output.appendLine(`Répertoire de travail: ${workingDirectory}`);
        this.output.appendLine(`Exécutable PHP: ${phpExecutable}`);
        this.output.appendLine(`Docker Compose: ${dockerComposePath || 'Fichier par défaut du workspace'}`);
        this.output.appendLine(`Utilisateur Docker: ${dockerUser || 'root'}`);
        this.output.show();
    }
}
