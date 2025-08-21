// Minimal VS Code API mock injected before loading modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Module = require('module');

class EventEmitter<T> {
	private listeners: Array<(e: T) => any> = [];
	public event = (listener: (e: T) => any) => {
		this.listeners.push(listener);
		return { dispose: () => {} };
	};
	public fire(e: T) {
		for (const l of this.listeners) { try { l(e); } catch {} }
	}
}

class TreeItem {
	label: any;
	collapsibleState?: number;
	contextValue?: string;
	description?: string;
	command?: any;
	constructor(label: any, collapsibleState?: number) {
		this.label = label;
		this.collapsibleState = collapsibleState;
	}
}

const TreeItemCollapsibleState = { None: 0, Collapsed: 1, Expanded: 2 } as const;

const configStore: Record<string, any> = { dockerPhpRunner: {} };

const vscodeMock = {
	EventEmitter,
	TreeItem,
	TreeItemCollapsibleState,
	ConfigurationTarget: { Global: 1, Workspace: 2, WorkspaceFolder: 3 },
	workspace: {
		workspaceFolders: [] as any[],
		onDidChangeConfiguration: (_listener: any) => ({ dispose: () => {} }),
		getConfiguration: (section: string) => ({
			get: (key: string, defaultValue?: any) => {
				const sectionStore = configStore[section] || {};
				return Object.prototype.hasOwnProperty.call(sectionStore, key) ? sectionStore[key] : defaultValue;
			},
			update: async (key: string, value: any) => {
				if (!configStore[section]) { configStore[section] = {}; }
				configStore[section][key] = value;
			}
		})
	},
	window: {
		showInformationMessage: () => {},
		showErrorMessage: () => {},
		showQuickPick: async () => undefined,
		showOpenDialog: async () => undefined,
		showTextDocument: async () => undefined,
		openTextDocument: async () => ({}),
		registerTreeDataProvider: () => ({ dispose: () => {} }),
		createOutputChannel: () => ({ name: 'test', append: () => {}, appendLine: () => {}, clear: () => {}, show: () => {}, hide: () => {}, dispose: () => {} })
	},
	commands: {
		executeCommand: async () => undefined
	}
};

const originalLoad = Module._load;
Module._load = function(request: string, parent: unknown, isMain: unknown) {
	if (request === 'vscode') {
		return vscodeMock;
	}
	// @ts-ignore
	return originalLoad.apply(this, arguments);
};


