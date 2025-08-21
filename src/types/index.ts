import * as vscode from 'vscode';

export interface DockerComposeService {
    name: string;
    containerName?: string;
}

export interface DockerComposeConfig {
    services: { [key: string]: any };
}

export interface DockerConfiguration {
    containerName?: string;
    serviceName?: string;
    workingDirectory: string;
    phpExecutable: string;
    dockerComposePath?: string;
}

export interface SavedCommand {
    label: string;
    command?: string;
    steps?: string[];
}

export interface FileExplorerOptions {
    canSelectFiles: boolean;
    canSelectFolders: boolean;
    canSelectMany: boolean;
    openLabel: string;
    filters?: { [key: string]: string[] };
    defaultUri?: vscode.Uri;
}
