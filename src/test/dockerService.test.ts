import type { OutputChannel } from 'vscode';
import { expect } from 'chai';
import { DockerConfiguration } from '../types';
import { DockerService } from '../services/dockerService';

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
});


