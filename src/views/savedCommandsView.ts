import * as vscode from 'vscode';
import { ConfigurationService } from '../services/configurationService';
import { SavedCommand } from '../types';
import { COMMAND_IDS } from '../constants';

export class SavedCommandTreeItem extends vscode.TreeItem {
    public readonly index: number;
    public readonly saved: SavedCommand;

    constructor(index: number, saved: SavedCommand) {
        super(saved.label, vscode.TreeItemCollapsibleState.None);
        this.index = index;
        this.saved = saved;
        this.contextValue = 'savedCommand';
        this.description = saved.command ? saved.command : (saved.steps ? `${saved.steps.length} étape(s)` : '');
        this.command = {
            command: COMMAND_IDS.RUN_SAVED_COMMAND,
            title: 'Exécuter',
            arguments: [{ saved, index }]
        };
    }
}

export class SavedCommandsProvider implements vscode.TreeDataProvider<SavedCommandTreeItem> {
    private readonly configurationService: ConfigurationService;
    private readonly _onDidChangeTreeData: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    readonly onDidChangeTreeData: vscode.Event<void> = this._onDidChangeTreeData.event;

    constructor(configurationService: ConfigurationService) {
        this.configurationService = configurationService;
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('dockerPhpRunner.savedCommands')) {
                this.refresh();
            }
        });
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: SavedCommandTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(): Thenable<SavedCommandTreeItem[]> {
        const saved = this.configurationService.getSavedCommands();
        const items = saved.map((s, i) => new SavedCommandTreeItem(i, s));
        return Promise.resolve(items);
    }
}


