export const COMMON_WORKING_DIRS = [
    '/var/www/html',
    '/app',
    '/var/www',
    '/home/app',
    '/srv/app'
];

export const COMMON_PHP_EXECUTABLES = [
    'php',
    '/usr/local/bin/php',
    '/usr/bin/php',
    '/opt/php/bin/php'
];

export const COMMON_DOCKER_COMPOSE_PATHS = [
    'docker-compose.yml',
    'docker-compose.yaml',
    'docker-compose.override.yml',
    'docker-compose.prod.yml',
    'docker-compose.dev.yml'
];

export const COMMAND_IDS = {
    RUN_COMMAND: 'dockerPhpRunner.runCommand',
    CLEAR_CACHE: 'dockerPhpRunner.clearCache',
    RUN_TESTS: 'dockerPhpRunner.runTests',
    CONFIGURE_CONTAINER: 'dockerPhpRunner.configureContainer',
    EXPLORE_FILES: 'dockerPhpRunner.exploreFiles',
    BROWSE_CONTAINER: 'dockerPhpRunner.browseContainer',
    PICK_DOCKER_COMPOSE_PATH: 'dockerPhpRunner.pickDockerComposePath',
    PICK_SERVICE_NAME: 'dockerPhpRunner.pickServiceName',
    RUN_SAVED_COMMAND: 'dockerPhpRunner.runSavedCommand',
    ADD_SAVED_COMMAND: 'dockerPhpRunner.addSavedCommand',
    EDIT_SAVED_COMMAND: 'dockerPhpRunner.editSavedCommand',
    DELETE_SAVED_COMMAND: 'dockerPhpRunner.deleteSavedCommand'
} as const;

export const MESSAGES = {
    NO_WORKSPACE: 'Aucun workspace ouvert',
    NO_SERVICE_FOUND: 'Aucun service trouvé dans docker-compose.yml',
    CONFIGURATION_REQUIRED: 'Veuillez configurer le nom du container ou du service Docker',
    COMMAND_SUCCESS: 'Commande exécutée avec succès',
    CONFIGURATION_SAVED: 'Configuration Docker sauvegardée avec succès !',
    NO_DOCKER_COMPOSE_FOUND: 'Aucun fichier docker-compose trouvé dans les emplacements communs. Utilisez l\'option "Saisir le chemin manuellement".'
} as const;
