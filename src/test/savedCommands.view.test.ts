import { expect } from 'chai';
import type { OutputChannel } from 'vscode';
import { SavedCommandsProvider } from '../views/savedCommandsView';
import { ConfigurationService } from '../services/configurationService';

describe('SavedCommandsProvider', () => {
    const output: OutputChannel = {
        name: 'test', append: () => {}, appendLine: () => {}, clear: () => {}, show: () => {}, hide: () => {}, dispose: () => {}
    } as unknown as OutputChannel;

    it('returns tree items for saved commands', async () => {
        const config = new ConfigurationService(output);
        await config.replaceSavedCommands([
            { label: 'One', command: 'bin/console one' },
            { label: 'Two', steps: ['a', 'b'] }
        ]);

        const provider = new SavedCommandsProvider(config);
        const children = await provider.getChildren();
        expect(children).to.have.length(2);
        expect(children[0].label).to.equal('One');
        expect(children[1].label).to.equal('Two');
    });
});


