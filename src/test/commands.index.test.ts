import { expect } from 'chai';
import type { OutputChannel } from 'vscode';
import { CommandManager } from '../commands/index';

describe('CommandManager getContainerNameFromService', () => {
    it('builds docker compose ps command with -f when path provided', async () => {
        const output: OutputChannel = {
            name: 'test', append: () => {}, appendLine: () => {}, clear: () => {}, show: () => {}, hide: () => {}, dispose: () => {}
        } as unknown as OutputChannel;
        const manager = new CommandManager(output);

        // @ts-ignore access private method for testing
        const fn = manager['getContainerNameFromService'].bind(manager);

        // Intercept child_process.exec via a stub-like approach
        const child_process = require('child_process');
        const util = require('util');

        const calls: string[] = [];
        const execMock = (cmd: string) => {
            calls.push(cmd);
            if (cmd.startsWith('docker compose')) {
                return Promise.resolve({ stdout: 'fakeContainerId\n' });
            }
            if (cmd.startsWith('docker inspect')) {
                return Promise.resolve({ stdout: '/fake-container\n' });
            }
            return Promise.resolve({ stdout: '' });
        };

        // monkey patch promisify(exec)
        const originalExec = child_process.exec;
        const originalPromisify = util.promisify;
        // Replace promisify to return our execMock
        util.promisify = () => execMock as any;

        try {
            const name = await fn('app', '/tmp/docker-compose.yml');
            expect(name).to.equal('fake-container');
            expect(calls[0]).to.equal('docker compose -f "/tmp/docker-compose.yml" ps -q app');
        } finally {
            // restore
            util.promisify = originalPromisify;
            child_process.exec = originalExec;
        }
    });
});


