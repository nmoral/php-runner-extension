import * as vscode from 'vscode';
import { expect } from 'chai';
import { ConfigurationService } from '../services/configurationService';
import { DockerConfiguration } from '../types';

describe('ConfigurationService', () => {
    let mockOutput: vscode.OutputChannel;
    let service: ConfigurationService;
    let mockConfig: vscode.WorkspaceConfiguration;

    beforeEach(() => {
        mockOutput = {
            name: 'test',
            append: () => {},
            appendLine: () => {},
            clear: () => {},
            show: () => {},
            hide: () => {},
            dispose: () => {}
        } as unknown as vscode.OutputChannel;

        mockConfig = {
            get: () => {},
            update: () => Promise.resolve(),
            has: () => false,
            inspect: () => undefined
        } as unknown as vscode.WorkspaceConfiguration;

        // Mock vscode.workspace.getConfiguration
        (vscode.workspace.getConfiguration as any) = () => mockConfig;

        service = new ConfigurationService(mockOutput);
    });

    describe('getDockerConfiguration', () => {
        it('should include dockerUser in configuration', () => {
            const mockGet = (key: string, defaultValue?: any) => {
                const values: { [key: string]: any } = {
                    'containerName': 'test-container',
                    'serviceName': 'test-service',
                    'workingDirectory': '/var/www/html',
                    'phpExecutable': 'php',
                    'dockerComposePath': '/path/to/docker-compose.yml',
                    'dockerUser': 'www-data'
                };
                return values[key] || defaultValue;
            };

            (mockConfig.get as any) = mockGet;

            const config = service.getDockerConfiguration();

            expect(config).to.deep.include({
                containerName: 'test-container',
                serviceName: 'test-service',
                workingDirectory: '/var/www/html',
                phpExecutable: 'php',
                dockerComposePath: '/path/to/docker-compose.yml',
                dockerUser: 'www-data'
            });
        });

        it('should return empty string for dockerUser when not configured', () => {
            const mockGet = (key: string, defaultValue?: any) => {
                const values: { [key: string]: any } = {
                    'containerName': 'test-container',
                    'serviceName': 'test-service',
                    'workingDirectory': '/var/www/html',
                    'phpExecutable': 'php',
                    'dockerComposePath': '/path/to/docker-compose.yml'
                };
                return values[key] || defaultValue;
            };

            (mockConfig.get as any) = mockGet;

            const config = service.getDockerConfiguration();

            expect(config.dockerUser).to.equal('');
        });
    });
});
