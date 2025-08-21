# Guide de configuration - Docker PHP Runner Extension

## 🚀 Installation

### 1. Prérequis
- VS Code 1.74.0 ou supérieur
- Docker et Docker Compose installés et fonctionnels
- Un projet PHP avec configuration Docker

### 2. Installation de l'extension
1. Clonez ce repository dans votre dossier d'extensions VS Code
2. Ouvrez un terminal dans le dossier de l'extension
3. Installez les dépendances : `npm install`
4. Compilez l'extension : `npm run compile`
5. Redémarrez VS Code

## ⚙️ Configuration

### Configuration automatique (recommandée)

1. **Ouvrez un workspace** contenant un projet PHP avec Docker
2. **Appuyez sur** `Ctrl+Shift+P` (ou `Cmd+Shift+P` sur Mac)
3. **Tapez** : `Docker PHP: Configurer le container`
4. **Suivez les étapes** de configuration :
   - Sélectionnez le service PHP dans la liste
   - Spécifiez le répertoire de travail (défaut: `/var/www/html`)
   - Spécifiez l'exécutable PHP (défaut: `php`)
   - **Optionnel** : Spécifiez un chemin personnalisé vers docker-compose.yml

### Configuration manuelle

#### Via les paramètres VS Code

1. **Ouvrez les paramètres** : `Ctrl+,` (ou `Cmd+,` sur Mac)
2. **Recherchez** : `dockerPhpRunner`
3. **Configurez** les paramètres suivants :

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.yml"
}
```

#### Via le fichier .vscode/settings.json

Créez ou modifiez le fichier `.vscode/settings.json` dans votre workspace :

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.yml"
}
```

## 🌟 Configuration avancée : Chemin personnalisé Docker Compose

### Cas d'usage

Cette fonctionnalité est particulièrement utile quand :

- Votre `docker-compose.yml` n'est pas à la racine du workspace
- Vous utilisez plusieurs fichiers docker-compose pour différents environnements
- Vous travaillez avec des projets ayant une structure de dossiers complexe

### Exemples de configuration

#### Structure de projet avec dossier docker séparé

```
mon-projet/
├── src/                    # Code source
├── docker/
│   ├── docker-compose.yml  # Configuration principale
│   └── docker-compose.override.yml
├── .vscode/
│   └── settings.json      # Configuration VS Code
└── README.md
```

Configuration dans `.vscode/settings.json` :
```json
{
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.yml",
  "dockerPhpRunner.serviceName": "app"
}
```

#### Projet avec docker-compose dans un sous-dossier

```
mon-projet/
├── src/
├── infrastructure/
│   └── docker-compose.yml
├── .vscode/
│   └── settings.json
└── README.md
```

Configuration :
```json
{
  "dockerPhpRunner.dockerComposePath": "./infrastructure/docker-compose.yml",
  "dockerPhpRunner.serviceName": "php"
}
```

#### Projet avec plusieurs environnements

```
mon-projet/
├── src/
├── docker/
│   ├── docker-compose.yml      # Développement
│   ├── docker-compose.test.yml # Tests
│   └── docker-compose.prod.yml # Production
├── .vscode/
│   └── settings.json
└── README.md
```

Configuration pour les tests :
```json
{
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.test.yml",
  "dockerPhpRunner.serviceName": "test"
}
```

#### Chemin absolu

Si vous préférez utiliser un chemin absolu :

```json
{
  "dockerPhpRunner.dockerComposePath": "/home/user/projects/mon-projet/docker/docker-compose.yml",
  "dockerPhpRunner.serviceName": "app"
}
```

### Validation de la configuration

Après avoir configuré l'extension :

1. **Vérifiez** que le fichier docker-compose.yml existe au chemin spécifié
2. **Testez** la configuration avec une commande simple
3. **Consultez** le canal de sortie "Docker PHP Runner" pour les détails

## 🔧 Paramètres de configuration détaillés

### serviceName
- **Type** : `string`
- **Description** : Nom du service dans le fichier docker-compose.yml
- **Exemples** : `app`, `php`, `web`, `backend`
- **Requis** : Si `containerName` n'est pas défini

### containerName
- **Type** : `string`
- **Description** : Nom du container Docker (alternative au service name)
- **Utilisation** : Quand on n'utilise pas docker-compose
- **Requis** : Si `serviceName` n'est pas défini

### workingDirectory
- **Type** : `string`
- **Défaut** : `/var/www/html`
- **Description** : Répertoire de travail dans le container
- **Exemples** : `/var/www/html`, `/app`, `/var/www`

### phpExecutable
- **Type** : `string`
- **Défaut** : `php`
- **Description** : Chemin vers l'exécutable PHP dans le container
- **Exemples** : `php`, `/usr/local/bin/php`, `php8.2`

### dockerComposePath ⭐ **NOUVEAU**
- **Type** : `string`
- **Défaut** : `""` (fichier par défaut du workspace)
- **Description** : Chemin personnalisé vers le fichier docker-compose.yml
- **Exemples** : 
  - `./docker/docker-compose.yml`
  - `../docker/docker-compose.yml`
  - `/absolute/path/to/docker-compose.yml`
- **Note** : Si laissé vide, utilise le fichier par défaut du workspace

## 🧪 Test de la configuration

### 1. Vérification de base
1. **Ouvrez** la palette de commandes (`Ctrl+Shift+P`)
2. **Tapez** : `Docker PHP: Configurer le container`
3. **Vérifiez** que la configuration est sauvegardée

### 2. Test d'une commande simple
1. **Exécutez** : `Docker PHP: Exécuter une commande`
2. **Saisissez** : `php --version`
3. **Vérifiez** que la commande s'exécute correctement

### 3. Test des commandes prédéfinies
1. **Testez** : `Docker PHP: Vider le cache Symfony`
2. **Testez** : `Docker PHP: Lancer les tests PHPUnit`

## 🔍 Dépannage

### Problèmes courants

#### "Configuration Docker manquante"
- **Cause** : Aucun service ou container configuré
- **Solution** : Exécutez `Docker PHP: Configurer le container`

#### "Fichier docker-compose.yml non trouvé"
- **Cause** : Le fichier n'existe pas au chemin spécifié
- **Solution** : 
  - Vérifiez le chemin dans `dockerComposePath`
  - Vérifiez que le fichier existe
  - Utilisez un chemin relatif ou absolu correct

#### "Service non trouvé"
- **Cause** : Le nom du service est incorrect
- **Solution** : 
  - Vérifiez le nom du service dans docker-compose.yml
  - Reconfigurez avec `Docker PHP: Configurer le container`

#### Erreur de permission
- **Cause** : Problème de permissions Docker
- **Solution** : 
  - Vérifiez que votre utilisateur a accès à Docker
  - Vérifiez que le container a les bonnes permissions

### Vérification de la configuration

La configuration actuelle est affichée dans le canal de sortie "Docker PHP Runner" après chaque configuration. Vérifiez :

1. **Service/Container** : Nom correct
2. **Répertoire de travail** : Chemin valide dans le container
3. **Exécutable PHP** : Commande accessible
4. **Docker Compose** : Chemin correct vers le fichier

## 📚 Ressources supplémentaires

- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Docker PHP Images](https://hub.docker.com/_/php)

## 🆘 Support

Pour toute question ou problème :

1. **Consultez** la documentation
2. **Vérifiez** les issues existantes sur le repository
3. **Ouvrez** une nouvelle issue avec les détails du problème

---

**Configuration réussie ! 🎉 Votre extension Docker PHP Runner est maintenant prête à utiliser.**
