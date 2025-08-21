# 📦 Installation de Docker PHP Runner

## 🎯 Package Prêt à Installer

L'extension **Docker PHP Runner v0.1.0** est maintenant packagée et prête à être installée dans VS Code !

### 📁 Fichier Package
- **Nom** : `docker-php-runner-0.1.0.vsix`
- **Taille** : 42.5 KB
- **Version** : 0.1.0
- **Date** : 20/08/2025

## 🚀 Installation

### Méthode 1 : Installation via VS Code (Recommandée)

1. **Ouvrez VS Code**
2. **Ouvrez la palette de commandes** : `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (Mac)
3. **Tapez** : `Extensions: Install from VSIX...`
4. **Sélectionnez** le fichier `docker-php-runner-0.1.0.vsix`
5. **Redémarrez VS Code** si demandé

### Méthode 2 : Installation via ligne de commande

```bash
# Naviguez vers le dossier contenant le fichier VSIX
cd D:\workspace\extension

# Installez l'extension
code --install-extension docker-php-runner-0.1.0.vsix
```

### Méthode 3 : Glisser-déposer

1. **Ouvrez VS Code**
2. **Glissez-déposez** le fichier `docker-php-runner-0.1.0.vsix` dans la fenêtre VS Code
3. **Confirmez l'installation**

## ✅ Vérification de l'Installation

### 1. Vérifiez que l'extension est installée
1. Ouvrez VS Code
2. Allez dans **Extensions** (`Ctrl+Shift+X`)
3. Recherchez "Docker PHP Runner"
4. L'extension devrait apparaître comme **installée**

### 2. Testez les commandes
1. Ouvrez la palette de commandes (`Ctrl+Shift+P`)
2. Tapez "Docker PHP" - vous devriez voir 6 commandes :
   - ✅ `Docker PHP: Exécuter une commande`
   - ✅ `Docker PHP: Vider le cache Symfony`
   - ✅ `Docker PHP: Lancer les tests PHPUnit`
   - ✅ `Docker PHP: Configurer le container`
   - 🆕 `Docker PHP: Explorer les fichiers du workspace`
   - 🆕 `Docker PHP: Parcourir les fichiers du container`

## 🛠️ Configuration Initiale

### 1. Première utilisation
1. Ouvrez votre projet PHP avec Docker
2. Lancez `Docker PHP: Configurer le container`
3. Suivez l'assistant de configuration

### 2. Configuration manuelle (optionnelle)
Ajoutez dans vos paramètres VS Code (`.vscode/settings.json`) :

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker-compose.yml"
}
```

## 🎯 Fonctionnalités Disponibles

### Commandes PHP
- **Exécuter une commande personnalisée** : Lancez n'importe quelle commande PHP
- **Vider le cache Symfony** : `bin/console cache:clear`
- **Lancer les tests PHPUnit** : `bin/phpunit`

### Navigation des Fichiers ✨ NOUVEAU
- **Explorer les fichiers du workspace** : Navigation VS Code native
- **Parcourir les fichiers du container** : Navigation interactive dans le container Docker

### Configuration
- **Assistant de configuration** : Configuration guidée pas à pas
- **Détection automatique** : Services Docker Compose détectés automatiquement

## 🐛 Dépannage

### Problème : Extension non visible
- **Solution** : Redémarrez VS Code après l'installation

### Problème : Commandes non disponibles
- **Solution** : Vérifiez que l'extension est activée dans le panneau Extensions

### Problème : Erreur de container
- **Solution** : Lancez `Docker PHP: Configurer le container` pour configurer votre environnement

## 📚 Documentation

- **README.md** - Documentation complète
- **DEMO.md** - Démonstration des fonctionnalités
- **CHANGELOG.md** - Historique des versions
- **TROUBLESHOOTING.md** - Guide de résolution des problèmes

## 🚀 Utilisation Rapide

1. **Installez** l'extension VSIX
2. **Configurez** votre container : `Ctrl+Shift+P` → "Docker PHP: Configurer le container"
3. **Explorez** vos fichiers : `Ctrl+Shift+P` → "Docker PHP: Parcourir les fichiers du container"
4. **Exécutez** vos commandes : `Ctrl+Shift+P` → "Docker PHP: Exécuter une commande"

---

**L'extension Docker PHP Runner v0.1.0 est maintenant prête à être utilisée avec ses nouvelles fonctionnalités de navigation des fichiers !** 🎉
