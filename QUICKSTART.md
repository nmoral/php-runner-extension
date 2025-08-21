# 🚀 Guide de démarrage rapide - Docker PHP Runner

## ⚡ Installation en 30 secondes

1. **Installer l'extension** depuis le marketplace VS Code
2. **Ouvrir votre projet** PHP avec Docker
3. **Lancer la configuration** : `Ctrl+Shift+P` → "Docker PHP: Configurer le container"
4. **C'est tout !** 🎉

## 🎯 Première utilisation

### 1. Configuration automatique
```
Ctrl+Shift+P → "Docker PHP: Configurer le container"
```

### 2. Sélection du fichier docker-compose
Choisissez parmi 3 options :
- 📁 **Parcourir** : Interface graphique pour sélectionner le fichier
- 🔍 **Défaut** : Utilise le fichier du workspace
- ✏️ **Manuel** : Saisie avec autocomplétion

### 3. Sélection du service
L'extension détecte automatiquement vos services PHP disponibles.

### 4. Configuration des paramètres
- **Répertoire de travail** : Suggestions automatiques (`/var/www/html`, `/app`, etc.)
- **Exécutable PHP** : Suggestions automatiques (`php`, `/usr/local/bin/php`, etc.)

## 🚀 Utilisation immédiate

### Commandes rapides
```
Ctrl+Shift+P → "Docker PHP: Vider le cache Symfony"
Ctrl+Shift+P → "Docker PHP: Lancer les tests PHPUnit"
```

### Commandes personnalisées
```
Ctrl+Shift+P → "Docker PHP: Exécuter une commande"
→ Entrer: bin/console cache:clear
→ Entrer: composer install
→ Entrer: php artisan migrate
```

## 📁 Structure de projet supportée

### ✅ Projets standards
```
mon-projet/
├── docker-compose.yml          ← Détecté automatiquement
├── src/
└── README.md
```

### ✅ Projets avec structure personnalisée
```
mon-projet/
├── src/
├── docker/
│   └── docker-compose.yml     ← Sélectionnable via l'interface
└── README.md
```

### ✅ Projets multi-environnements
```
mon-projet/
├── docker-compose.yml          ← Développement
├── docker-compose.prod.yml     ← Production
├── docker-compose.test.yml     ← Tests
└── src/
```

## 🔧 Configuration avancée

### Paramètres VS Code
```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker-compose.yml"
}
```

### Variables d'environnement
```bash
# Dans votre docker-compose.yml
environment:
  - APP_ENV=dev
  - DATABASE_URL=mysql://user:pass@db:3306/myapp
```

## 🎨 Interface utilisateur

### Sélecteur de fichier
- **Interface native VS Code**
- **Filtres automatiques** pour les fichiers YAML
- **Validation en temps réel**

### Autocomplétion
- **Chemins suggérés** : `docker-compose.yml`, `docker-compose.override.yml`
- **Répertoires suggérés** : `/var/www/html`, `/app`, `/var/www`
- **Exécutables suggérés** : `php`, `/usr/local/bin/php`

### Configuration guidée
- **Assistant étape par étape**
- **Validation automatique**
- **Suggestions contextuelles**

## 🚨 Résolution de problèmes

### Problème : "Configuration Docker manquante"
**Solution** : Lancez `Docker PHP: Configurer le container`

### Problème : "Fichier docker-compose non trouvé"
**Solution** : Utilisez le sélecteur de fichier ou vérifiez le chemin

### Problème : "Service non trouvé"
**Solution** : Vérifiez que le service existe dans docker-compose.yml

### Problème : Container non démarré
**Solution** : Lancez `docker-compose up -d` dans votre terminal

## 📚 Commandes utiles

### Symfony
```bash
bin/console cache:clear
bin/console doctrine:migrations:migrate
bin/console make:entity User
```

### Laravel
```bash
php artisan cache:clear
php artisan migrate
php artisan make:controller HomeController
```

### Composer
```bash
composer install
composer update
composer dump-autoload
```

### Tests
```bash
bin/phpunit
bin/phpunit --coverage-html coverage/
vendor/bin/phpstan analyse
```

## 🔍 Détection automatique

L'extension détecte automatiquement :
- ✅ **Services** dans docker-compose.yml
- ✅ **Fichiers** existants
- ✅ **Chemins** communs
- ✅ **Répertoires** de travail standards
- ✅ **Exécutables** PHP courants

## 🎉 Avantages

- **Interface intuitive** : Plus besoin de mémoriser les chemins
- **Configuration automatique** : Détection intelligente des paramètres
- **Validation en temps réel** : Moins d'erreurs de configuration
- **Flexibilité maximale** : Support de toutes les structures de projet
- **Productivité** : Commandes rapides et personnalisées

## 🆘 Besoin d'aide ?

1. **Documentation complète** : Voir `README.md`
2. **Démonstration** : Voir `DEMO.md`
3. **Configuration** : Voir `.vscode/settings.example.json`
4. **Exemple Docker** : Voir `docker-compose.example.yml`

---

**Développé avec ❤️ pour la communauté PHP et Docker**

**Extension Docker PHP Runner v0.0.3** 🚀
