import * as vscode from 'vscode';
import { CommandManager } from './commands';
import { SavedCommandsProvider } from './views/savedCommandsView';

// Main extension class
class DockerPhpRunnerExtension {
    private context: vscode.ExtensionContext;
    private output: vscode.OutputChannel;
    private commandManager: CommandManager;
    private savedCommandsProvider: SavedCommandsProvider;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.output = vscode.window.createOutputChannel('Docker PHP Runner');
        this.commandManager = new CommandManager(this.output);
        this.savedCommandsProvider = new SavedCommandsProvider(this.commandManager['configurationService']);
        this.initialize();
    }

    private initialize(): void {
        this.commandManager.registerCommands(this.context);
        vscode.window.registerTreeDataProvider('dockerPhpRunner.savedCommandsView', this.savedCommandsProvider);
    }
}

// Extension activation
export function activate(context: vscode.ExtensionContext): void {
    new DockerPhpRunnerExtension(context);
}

// Extension deactivation
export function deactivate(): void {
}

