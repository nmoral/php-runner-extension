import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { DockerConfiguration } from '../types';

const execAsync = promisify(exec);

export class DockerService {
    private output: vscode.OutputChannel;
    private terminal: vscode.Terminal | undefined;

    constructor(output: vscode.OutputChannel) {
        this.output = output;
    }

    async executeCommand(command: string, config: DockerConfiguration): Promise<{ stdout: string; stderr: string }> {
        try {
            if (!this.isConfigurationValid(config)) {
                throw new Error('Configuration Docker invalide');
            }

            const dockerCommand = this.buildDockerCommand(command, config);
            // Utiliser le terminal intégré de VS Code afin de préserver les séquences ANSI
            // (couleurs) et les retours chariots (barres de progression) sans duplication.

            const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

            // Ouvrir un terminal VS Code et exécuter la commande pour afficher la sortie en direct
            if (this.terminal) {
                try { this.terminal.dispose(); } catch { /* noop */ }
            }
            this.terminal = vscode.window.createTerminal({ name: 'Docker PHP Runner', cwd: workspacePath });
            this.terminal.show(true);
            // Exécuter directement la commande sans affichage préalable
            this.terminal.sendText(dockerCommand, true);

            // Nous ne pouvons pas capturer stdout/stderr depuis le terminal; retourner des valeurs vides
            return { stdout: '', stderr: '' };

        } catch (error: any) {
            const errorMessage = `Erreur lors de l'exécution de la commande: ${error.message}`;
            this.output.appendLine(errorMessage);
            this.output.show();
            throw error;
        }
    }

    private isConfigurationValid(config: DockerConfiguration): boolean {
        return !!(config.containerName || config.serviceName);
    }

    private buildDockerCommand(command: string, config: DockerConfiguration): string {
        const { serviceName, containerName, phpExecutable, dockerUser } = config;

        if (serviceName) {
            const dockerComposePath = config.dockerComposePath;
            const userOption = dockerUser ? ` --user ${dockerUser}` : '';
            
            if (dockerComposePath) {
                return `docker compose -f "${dockerComposePath}" exec${userOption} ${serviceName} ${phpExecutable} ${command}`;
            }
            return `docker compose exec${userOption} ${serviceName} ${phpExecutable} ${command}`;
        }

        if (containerName) {
            const userOption = dockerUser ? ` --user ${dockerUser}` : '';
            return `docker exec${userOption} ${containerName} ${phpExecutable} ${command}`;
        }

        throw new Error('Configuration Docker manquante');
    }



    async listContainerFiles(containerName: string, filePath: string = '/'): Promise<string[]> {
        try {
            const command = `docker exec ${containerName} ls -la "${filePath}"`;
            const { stdout } = await execAsync(command);
            
            return stdout
                .split('\n')
                .filter(line => line.trim() && !line.startsWith('total'))
                .map(line => {
                    const parts = line.split(/\s+/);
                    const isDir = line.startsWith('d');
                    const name = parts[parts.length - 1];
                    return `${isDir ? '📁' : '📄'} ${name}`;
                });
        } catch (error) {
            this.output.appendLine(`Erreur lors de la liste des fichiers: ${error}`);
            return [];
        }
    }

    async exploreContainerDirectory(containerName: string, currentPath: string = '/'): Promise<void> {
        try {
            const files = await this.listContainerFiles(containerName, currentPath);
            
            if (files.length === 0) {
                vscode.window.showInformationMessage(`Aucun fichier trouvé dans ${currentPath}`);
                return;
            }

            const fileItems = files.map(file => ({
                label: file,
                description: file.startsWith('📁') ? 'Dossier' : 'Fichier'
            }));

            const navigationItems = [
                { label: '⬆️ Retour au répertoire parent', description: 'Remonter d\'un niveau' },
                { label: '🏠 Retour à la racine', description: 'Retourner à la racine du container' }
            ];

            const selectedFile = await vscode.window.showQuickPick(
                [...fileItems, ...navigationItems],
                {
                    placeHolder: `Contenu de ${currentPath}`
                }
            );

            if (!selectedFile) {
                return;
            }

            if (selectedFile.label === '⬆️ Retour au répertoire parent') {
                const parentPath = currentPath === '/' ? '/' : path.dirname(currentPath);
                this.exploreContainerDirectory(containerName, parentPath);
            } else if (selectedFile.label === '🏠 Retour à la racine') {
                this.exploreContainerDirectory(containerName, '/');
            } else if (selectedFile.label.startsWith('📁')) {
                const fileName = selectedFile.label.replace('📁 ', '');
                const newPath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`;
                this.exploreContainerDirectory(containerName, newPath);
            } else if (selectedFile.label.startsWith('📄')) {
                const fileName = selectedFile.label.replace('📄 ', '');
                const filePath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`;
                await this.viewContainerFile(containerName, filePath);
            }

        } catch (error) {
            vscode.window.showErrorMessage(`Erreur lors de l'exploration: ${error}`);
        }
    }

    private async viewContainerFile(containerName: string, filePath: string): Promise<void> {
        try {
            const command = `docker exec ${containerName} cat "${filePath}"`;
            const { stdout } = await execAsync(command);
            
            const document = await vscode.workspace.openTextDocument({
                content: stdout,
                language: this.getLanguageFromFileName(filePath)
            });
            
            await vscode.window.showTextDocument(document);
        } catch (error) {
            vscode.window.showErrorMessage(`Erreur lors de la lecture du fichier: ${error}`);
        }
    }

    private getLanguageFromFileName(fileName: string): string {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
            'php': 'php',
            'js': 'javascript',
            'ts': 'typescript',
            'json': 'json',
            'yml': 'yaml',
            'yaml': 'yaml',
            'md': 'markdown',
            'txt': 'plaintext',
            'log': 'plaintext'
        };
        
        return languageMap[ext || ''] || 'plaintext';
    }
}
