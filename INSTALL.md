# Installation et Utilisation - Docker PHP Runner Extension

## 📦 Installation de l'extension

### Option 1 : Installation depuis le fichier VSIX

1. **Téléchargez** le fichier `docker-php-runner-0.0.2.vsix`
2. **Ouvrez VS Code**
3. **Appuyez sur** `Ctrl+Shift+P` (ou `Cmd+Shift+P` sur Mac)
4. **Tapez** : `Extensions: Install from VSIX...`
5. **Sélectionnez** le fichier `docker-php-runner-0.0.2.vsix`
6. **Redémarrez** VS Code

### Option 2 : Installation via la ligne de commande

```bash
code --install-extension docker-php-runner-0.0.2.vsix
```

## 🚀 Première utilisation

### 1. Configuration automatique (recommandée)

1. **Ouvrez** un workspace contenant un projet PHP avec Docker
2. **Appuyez sur** `Ctrl+Shift+P` (ou `Cmd+Shift+P` sur Mac)
3. **Tapez** : `Docker PHP: Configurer le container`
4. **Suivez** les étapes de configuration :
   - Sélectionnez le service PHP dans la liste
   - Spécifiez le répertoire de travail (défaut: `/var/www/html`)
   - Spécifiez l'exécutable PHP (défaut: `php`)
   - **Optionnel** : Spécifiez un chemin personnalisé vers docker-compose.yml

### 2. Configuration manuelle

Créez ou modifiez le fichier `.vscode/settings.json` dans votre workspace :

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.yml"
}
```

## 🎯 Commandes disponibles

| Commande | Description | Raccourci |
|----------|-------------|-----------|
| `Docker PHP: Exécuter une commande` | Exécute une commande PHP personnalisée | - |
| `Docker PHP: Vider le cache Symfony` | Vide le cache Symfony | - |
| `Docker PHP: Lancer les tests PHPUnit` | Lance les tests PHPUnit | - |
| `Docker PHP: Configurer le container` | Configure l'extension | - |

## 🌟 Nouvelle fonctionnalité : Chemin personnalisé Docker Compose

### Cas d'usage

Cette fonctionnalité est particulièrement utile quand :

- Votre `docker-compose.yml` n'est pas à la racine du workspace
- Vous utilisez plusieurs fichiers docker-compose pour différents environnements
- Vous travaillez avec des projets ayant une structure de dossiers complexe

### Exemples de configuration

#### Structure avec dossier docker séparé
```
mon-projet/
├── src/
├── docker/
│   └── docker-compose.yml
└── .vscode/
    └── settings.json
```

Configuration :
```json
{
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.yml",
  "dockerPhpRunner.serviceName": "app"
}
```

#### Multi-environnements
```
mon-projet/
├── docker/
│   ├── docker-compose.yml      # Développement
│   ├── docker-compose.test.yml # Tests
│   └── docker-compose.prod.yml # Production
```

Configuration pour les tests :
```json
{
  "dockerPhpRunner.dockerComposePath": "./docker/docker-compose.test.yml",
  "dockerPhpRunner.serviceName": "test"
}
```

## 🧪 Test de l'extension

### 1. Vérification de la configuration
1. **Exécutez** : `Docker PHP: Configurer le container`
2. **Vérifiez** que la configuration est sauvegardée

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

### Vérification de la configuration

La configuration actuelle est affichée dans le canal de sortie "Docker PHP Runner" après chaque configuration.

## 📚 Documentation complète

- **DEMO.md** : Démonstration et exemples d'utilisation
- **SETUP.md** : Guide de configuration détaillé
- **README.md** : Documentation complète de l'extension

## 🆘 Support

Pour toute question ou problème :

1. **Consultez** la documentation fournie
2. **Vérifiez** les paramètres de configuration
3. **Testez** avec une commande simple d'abord

---

**🎉 Votre extension Docker PHP Runner est maintenant installée et prête à utiliser !**

**Fonctionnalité principale** : Support des chemins personnalisés pour docker-compose.yml
**Version** : 0.0.2
**Compatibilité** : VS Code 1.74.0+
