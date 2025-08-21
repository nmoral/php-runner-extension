import { expect } from 'chai';
import type { OutputChannel } from 'vscode';
import { CommandManager } from '../commands';
import { ConfigurationService } from '../services/configurationService';

// Minimal VS Code mock enhancements for this test
const vscode = require('vscode');

describe('Saved Commands flow', () => {
    const output: OutputChannel = {
        name: 'test', append: () => {}, appendLine: () => {}, clear: () => {}, show: () => {}, hide: () => {}, dispose: () => {}
    } as unknown as OutputChannel;

    it('can add, list, edit and delete saved commands', async () => {
        const manager = new CommandManager(output);
        const configService = (manager as any)['configurationService'] as ConfigurationService;

        // Ensure clean state
        await configService.replaceSavedCommands([]);
        expect(configService.getSavedCommands()).to.deep.equal([]);

        // Add single command via service
        await configService.addSavedCommand({ label: 'Clear cache', command: 'bin/console cache:clear' });
        // Add sequence
        await configService.addSavedCommand({ label: 'Migrate + cache', steps: ['bin/console doctrine:migrations:migrate --no-interaction', 'bin/console cache:clear'] });

        const list1 = configService.getSavedCommands();
        expect(list1).to.have.length(2);
        expect(list1[0].command).to.equal('bin/console cache:clear');
        expect(list1[1].steps).to.have.length(2);

        // Edit first to change label and command
        await configService.updateSavedCommandAt(0, { label: 'Cache:clear', command: 'bin/console cache:clear --no-warmup' });
        const list2 = configService.getSavedCommands();
        expect(list2[0].label).to.equal('Cache:clear');
        expect(list2[0].command).to.contain('--no-warmup');

        // Delete second
        await configService.deleteSavedCommandAt(1);
        const list3 = configService.getSavedCommands();
        expect(list3).to.have.length(1);
    });
});


