# 🚀 Guide de démarrage rapide - Docker PHP Runner

Une extension VS Code qui rend l'exécution de commandes PHP dans des containers Docker aussi fluide que du beurre ! 🐳☕

## ✨ De quoi s'agit-il ?

Vous en avez marre de jongler entre VS Code et votre terminal pour exécuter `docker-compose exec app bin/console cache:clear` ? On est passés par là aussi ! Cette extension met toutes vos commandes Docker PHP directement dans la palette de commandes de VS Code, pour que vous puissiez rester dans votre flux de développement.

## 🚀 Fonctionnalités qui vont changer votre journée

### Commandes PHP (le bon stuff)
- **Exécuteur de commandes personnalisées** : Exécutez n'importe quelle commande PHP dans votre container avec style
- **Vidage du cache Symfony** : Un clic pour `bin/console cache:clear` (parce que qui a le temps pour les problèmes de cache ?)
- **Tests PHPUnit** : Lancez `bin/phpunit` sans quitter votre éditeur
- **Commandes enregistrées** : Sauvegardez vos commandes préférées pour un accès rapide

### Exploration de fichiers
- **Explorateur de workspace** : Parcourez vos fichiers locaux via VS Code
- **Navigateur de fichiers du container** : Naviguez dans la structure de fichiers de votre container

### Configuration intelligente
- **Détection automatique** : Trouve automatiquement vos services Docker Compose
- **Configuration flexible** : Choisissez parmi les fichiers existants ou entrez les chemins manuellement
- **Persistance du workspace** : Vos paramètres restent (contrairement à ce café que vous avez oublié)

## 📦 Installation de l'extension

### Prérequis
Avant de plonger, assurez-vous d'avoir :
- **VS Code** (version 1.74.0 ou supérieure)
- **Docker** et **Docker Compose** installés et en cours d'exécution
- Un projet PHP avec un fichier `docker-compose.yml`

### Méthode 1 : Depuis le package VSIX (Recommandée)
1. **Téléchargez** le fichier `docker-php-runner-1.0.0-RC2.vsix`
2. **Ouvrez VS Code**
3. **Appuyez sur** `Ctrl+Shift+P` (ou `Cmd+Shift+P` sur Mac)
4. **Tapez** : `Extensions: Install from VSIX...`
5. **Sélectionnez** le fichier `docker-php-runner-1.0.0-RC2.vsix`
6. **Redémarrez** VS Code

### Méthode 2 : Via la ligne de commande
```bash
code --install-extension docker-php-runner-1.0.0-RC2.vsix
```

## 🔧 Correction du problème d'affichage des codes ANSI

### Problème résolu dans la version 1.0.0-RC2

Si vous rencontriez des caractères étranges comme `^[[1m^[[36m` ou des erreurs `zsh: command not found: mExécution` dans votre terminal, ce problème a été corrigé dans cette version.

**Avant (problématique) :**
```bash
^[[1m^[[36mExécution de:^[[0m docker compose -f "/path/to/docker-compose.yml" exec --user www-data php php vendor/bin/php-cs-fixer fix --quiet
zsh: command not found: mExécution
```

**Après (corrigé) :**
```bash
Exécution de: docker compose -f "/path/to/docker-compose.yml" exec --user www-data php php vendor/bin/php-cs-fixer fix --quiet
```

### Mise à jour depuis une version précédente
1. **Désinstallez** l'ancienne version de l'extension
2. **Installez** la nouvelle version `1.0.0-RC2`
3. **Redémarrez** VS Code

## ⚙️ Configuration - Mettons-nous en place !

### Configuration rapide (La méthode paresseuse - on approuve !)
1. **Ouvrez** votre projet PHP dans VS Code
2. **Appuyez sur** `Ctrl+Shift+P` pour ouvrir la palette de commandes
3. **Tapez** "Docker PHP: Configurer le container"
4. **Suivez** l'assistant de configuration amical

L'extension détectera automatiquement vos services Docker Compose et vous guidera à travers la configuration. C'est comme avoir un stagiaire serviable, mais sans les courses de café !

### Configuration manuelle (Pour les maniaques du contrôle)
Si vous préférez tout configurer manuellement, ajoutez ces paramètres à vos paramètres de workspace VS Code :

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker-compose.yml",
  "dockerPhpRunner.dockerUser": "www-data"
}
```

### Options de configuration expliquées

| Paramètre | Description | Défaut | Exemple |
|-----------|-------------|--------|---------|
| `serviceName` | Nom de votre service Docker | - | `"app"`, `"php"`, `"backend"` |
| `workingDirectory` | Répertoire de travail dans le container | `"/var/www/html"` | `"/app"`, `"/var/www"` |
| `phpExecutable` | Chemin vers l'exécutable PHP | `"php"` | `"php8.2"`, `"/usr/local/bin/php"` |
| `dockerComposePath` | Chemin vers docker-compose.yml | Auto-détecté | `"./docker-compose.yml"` |
| `dockerUser` | Utilisateur Docker pour les commandes | Défaut du container | `"www-data"`, `"1000:1000"` |

### Configuration de l'utilisateur Docker
C'est là que ça devient intéressant ! Vous pouvez spécifier quel utilisateur exécute vos commandes :

- **`root`** : L'approche classique "Je fais ce que je veux"
- **`www-data`** : La façon serveur web (recommandée pour les setups de production)
- **`1000:1000`** : La façon développeur (correspond à votre UID local)
- **Personnalisé** : Tout ce qui vous plaît

```json
{
  "dockerPhpRunner.dockerUser": "www-data"
}
```

## 🎯 Comment utiliser (La partie amusante !)

### Commandes disponibles
Toutes les commandes sont disponibles via la palette de commandes (`Ctrl+Shift+P`) :

- **`Docker PHP: Exécuter une commande`** - Exécutez n'importe quelle commande PHP
- **`Docker PHP: Vider le cache Symfony`** - Videz ce cache embêtant
- **`Docker PHP: Lancer les tests PHPUnit`** - Lancez vos tests
- **`Docker PHP: Configurer le container`** - Configurez votre container
- **`Docker PHP: Explorer les fichiers du workspace`** - Parcourez les fichiers locaux
- **`Docker PHP: Parcourir les fichiers du container`** - Explorez les fichiers du container
- **`Docker PHP: Exécuter une commande enregistrée`** - Exécutez une commande sauvegardée
- **`Docker PHP: Ajouter une commande enregistrée`** - Sauvegardez une nouvelle commande

### Fonctionnalité des commandes enregistrées
Sauvegardez vos commandes fréquemment utilisées pour un accès rapide :

```json
{
  "dockerPhpRunner.savedCommands": [
    {
      "label": "Vider tous les caches",
      "command": "bin/console cache:clear"
    },
    {
      "label": "Migration de base de données",
      "steps": [
        "bin/console doctrine:migrations:migrate --no-interaction",
        "bin/console cache:clear"
      ]
    }
  ]
}
```

### Exemples concrets
Voici quelques commandes que vous pourriez réellement utiliser :

```bash
# Commandes Symfony
bin/console cache:clear
bin/console doctrine:migrations:migrate
bin/console make:entity User

# Commandes Composer
composer install
composer update
composer dump-autoload

# Tests
bin/phpunit
bin/phpunit --filter=UserTest
vendor/bin/phpstan analyse

# Scripts personnalisés
php bin/console app:import-data
php scripts/deploy.php
```

## 🐛 Dépannage - Quand les choses tournent mal

### Problèmes courants et solutions

**Erreur "Container not found"**
- Assurez-vous que vos containers Docker sont en cours d'exécution : `docker-compose up -d`
- Vérifiez votre nom de service dans `docker-compose.yml`

**Erreur "Service not recognized"**
- Vérifiez que votre fichier `docker-compose.yml` existe
- Utilisez la commande "Docker PHP: Choisir un service" pour l'auto-complétion

**Erreurs de permission refusée**
- Essayez de changer le paramètre `dockerUser` à `root` temporairement
- Vérifiez votre configuration utilisateur Docker Compose

**Les commandes ne fonctionnent pas comme prévu**
- Vérifiez le panneau de sortie de l'extension pour des messages d'erreur détaillés
- Vérifiez que votre paramètre `workingDirectory` correspond à la structure de votre projet

### Obtenir de l'aide
- **Sortie de l'extension** : Consultez les logs détaillés dans le panneau de sortie "Docker PHP Runner"
- **Palette de commandes** : Utilisez "Developer: Reload Window" si les choses deviennent bizarres
- **GitHub Issues** : Trouvé un bug ? Faites-le nous savoir !

## 🏗️ Développement - Pour les esprits curieux

### Structure du projet
```
src/
├── types/           # Interfaces TypeScript
├── constants/       # Constantes et messages
├── utils/           # Utilitaires de fichiers
├── services/        # Logique métier
│   ├── dockerService.ts      # Opérations Docker
│   └── configurationService.ts # Gestion de la configuration
├── commands/        # Gestionnaires de commandes
└── extension.ts     # Point d'entrée principal
```

### Configuration de développement
```bash
# Installer les dépendances
npm install

# Compiler en mode watch
npm run watch

# Lancer les tests
npm run test

# Linter le code
npm run lint

# Emballer l'extension
npm run package
```

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

On adore les contributions ! Voici comment vous pouvez aider :

1. **Signaler des bugs** - Même les plus petits problèmes comptent
2. **Suggérer des fonctionnalités** - On cherche toujours de nouvelles idées
3. **Soumettre des pull requests** - Les contributions de code sont les bienvenues
4. **Améliorer la documentation** - Aidez les autres à comprendre l'extension

## 📞 Support & Communauté

- **GitHub Issues** : [Signaler des bugs ou demander des fonctionnalités](https://github.com/nmoral/php-runner-extension/issues)
- **Documentation** : Consultez le [Wiki](https://github.com/nmoral/php-runner-extension/wiki) pour des guides détaillés
- **Discussions** : Rejoignez la conversation dans [GitHub Discussions](https://github.com/nmoral/php-runner-extension/discussions)

---

**Bon codage !** 🎉 N'oubliez pas, le meilleur code est celui qui vous fait sourire (et qui ne casse pas en production).
