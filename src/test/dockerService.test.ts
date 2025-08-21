import type { OutputChannel } from 'vscode';
import { expect } from 'chai';
import { DockerConfiguration } from '../types';
import { DockerService } from '../services/dockerService';
import * as vscode from 'vscode';

describe('DockerService buildDockerCommand', () => {
    // Create a fake output channel
    const output: OutputChannel = {
        name: 'test',
        append: () => {},
        appendLine: () => {},
        clear: () => {},
        show: () => {},
        hide: () => {},
        dispose: () => {}
    } as unknown as OutputChannel;

    const service = new DockerService(output);

    const build = (command: string, config: DockerConfiguration) => (service as any).buildDockerCommand(command, config) as string;

    it('uses docker compose with -f when dockerComposePath is provided', () => {
        const cmd = build('bin/console cache:clear', {
            serviceName: 'app',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php',
            dockerComposePath: '/path/to/docker-compose.yml'
        });
        expect(cmd).to.contain('docker compose -f "/path/to/docker-compose.yml" exec app php bin/console cache:clear');
    });

    it('uses docker compose without -f when dockerComposePath is missing', () => {
        const cmd = build('bin/phpunit', {
            serviceName: 'app',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php'
        });
        expect(cmd).to.equal('docker compose exec app php bin/phpunit');
    });

    it('uses docker exec when containerName is provided', () => {
        const cmd = build('bin/console', {
            containerName: 'my_container',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php'
        });
        expect(cmd).to.equal('docker exec my_container php bin/console');
    });

    it('adds --user option to docker compose command when dockerUser is provided', () => {
        const cmd = build('bin/console cache:clear', {
            serviceName: 'app',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php',
            dockerUser: 'www-data'
        });
        expect(cmd).to.equal('docker compose exec --user www-data app php bin/console cache:clear');
    });

    it('adds --user option to docker compose command with custom path when dockerUser is provided', () => {
        const cmd = build('bin/console cache:clear', {
            serviceName: 'app',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php',
            dockerComposePath: '/path/to/docker-compose.yml',
            dockerUser: '1000:1000'
        });
        expect(cmd).to.equal('docker compose -f "/path/to/docker-compose.yml" exec --user 1000:1000 app php bin/console cache:clear');
    });

    it('adds --user option to docker exec command when dockerUser is provided', () => {
        const cmd = build('bin/console', {
            containerName: 'my_container',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php',
            dockerUser: 'root'
        });
        expect(cmd).to.equal('docker exec --user root my_container php bin/console');
    });

    it('does not add --user option when dockerUser is not provided', () => {
        const cmd = build('bin/console cache:clear', {
            serviceName: 'app',
            workingDirectory: '/var/www/html',
            phpExecutable: 'php'
        });
        expect(cmd).to.equal('docker compose exec app php bin/console cache:clear');
    });
});

describe('DockerService executeCommand', () => {
    it('should not use ANSI color codes in terminal output', async () => {
        const output: OutputChannel = {
            name: 'test',
            append: () => {},
            appendLine: () => {},
            clear: () => {},
            show: () => {},
            hide: () => {},
            dispose: () => {}
        } as unknown as OutputChannel;

        const service = new DockerService(output);
        
        // Mock vscode.window.createTerminal
        const sendTextCalls: string[] = [];
        const mockTerminal = {
            show: () => {},
            sendText: (text: string) => {
                sendTextCalls.push(text);
            },
            dispose: () => {}
        };
        
        const originalCreateTerminal = vscode.window.createTerminal;
        
        // Mock workspace folders
        Object.defineProperty(vscode.workspace, 'workspaceFolders', {
            value: [{ uri: { fsPath: '/test' } }],
            writable: true
        });
        
        vscode.window.createTerminal = () => mockTerminal as any;
        
        try {
            await service.executeCommand('php --version', {
                serviceName: 'app',
                workingDirectory: '/var/www/html',
                phpExecutable: 'php'
            });
            
            // Vérifier que sendText a été appelé
            expect(sendTextCalls.length).to.be.greaterThan(0);
            
            // Vérifier qu'aucun appel ne contient de codes ANSI
            sendTextCalls.forEach(text => {
                expect(text).to.not.contain('\u001b[');
                expect(text).to.not.contain('\u001b[1m');
                expect(text).to.not.contain('\u001b[36m');
                expect(text).to.not.contain('\u001b[0m');
            });
            
        } finally {
            vscode.window.createTerminal = originalCreateTerminal;
        }
    });
});


