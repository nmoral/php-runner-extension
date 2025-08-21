import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { COMMON_DOCKER_COMPOSE_PATHS } from '../constants';

export class FileUtils {
    static validateFilePath(input: string): string | null {
        if (!input.trim()) {
            return 'Le chemin ne peut pas être vide';
        }
        if (!fs.existsSync(input.trim())) {
            return 'Le fichier n\'existe pas à cet emplacement';
        }
        return null;
    }

    static async browseForFile(
        workspaceFolder: vscode.WorkspaceFolder,
        options: {
            canSelectFiles: boolean;
            canSelectFolders: boolean;
            canSelectMany: boolean;
            openLabel: string;
            filters?: { [key: string]: string[] };
        }
    ): Promise<string | undefined> {
        try {
            const uris = await vscode.window.showOpenDialog({
                ...options,
                defaultUri: vscode.Uri.file(workspaceFolder.uri.fsPath)
            });

            if (!uris || uris.length === 0) {
                return undefined;
            }

            return uris[0].fsPath;
        } catch (error) {
            vscode.window.showErrorMessage(`Erreur lors de l'ouverture du sélecteur de fichier: ${error}`);
            return undefined;
        }
    }

    static findExistingDockerComposeFiles(workspaceFolder: vscode.WorkspaceFolder): string[] {
        const commonPaths = [
            ...COMMON_DOCKER_COMPOSE_PATHS,
            path.join(workspaceFolder.uri.fsPath, 'docker-compose.yml'),
            path.join(workspaceFolder.uri.fsPath, 'docker', 'docker-compose.yml'),
            path.join(workspaceFolder.uri.fsPath, '..', 'docker-compose.yml')
        ];

        return commonPaths.filter(p => fs.existsSync(p));
    }

    static parseDockerComposeServices(dockerComposePath: string): string[] {
        const services: string[] = [];

        try {
            if (!fs.existsSync(dockerComposePath)) {
                throw new Error(`Fichier docker-compose.yml non trouvé à l'emplacement: ${dockerComposePath}`);
            }

            const content = fs.readFileSync(dockerComposePath, 'utf8');
            const lines = content.split('\n');

            let isInServicesBlock = false;
            let servicesIndent = 0;

            for (const rawLine of lines) {
                const line = rawLine.replace('\t', '    '); // Normaliser les tabulations en espaces
                const trimmed = line.trim();

                if (!trimmed || trimmed.startsWith('#')) {
                    continue;
                }

                const leadingSpaces = line.length - line.trimStart().length;

                // Détecter l'entrée/sortie du bloc services
                if (!isInServicesBlock && /^services\s*:\s*$/.test(trimmed)) {
                    isInServicesBlock = true;
                    servicesIndent = leadingSpaces;
                    continue;
                }

                if (isInServicesBlock) {
                    // Si on revient à un niveau d'indentation <= à celui de services, le bloc est terminé
                    if (leadingSpaces <= servicesIndent && !/^\s*-$/.test(trimmed)) {
                        isInServicesBlock = false;
                        continue;
                    }

                    // Les noms de services sont la première clé enfant directe sous services
                    const childIndent = servicesIndent + 2; // convention YAML: 2 espaces
                    if (leadingSpaces === childIndent) {
                        const match = trimmed.match(/^([a-zA-Z0-9_-]+)\s*:\s*(#.*)?$/);
                        if (match) {
                            services.push(match[1]);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors du parsing du docker-compose.yml:', error);
            throw error;
        }

        return services;
    }
}
