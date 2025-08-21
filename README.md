# Docker PHP Runner Extension

Une extension VS Code pour exécuter des commandes PHP dans des containers Docker et explorer les fichiers.

## 🚀 Fonctionnalités

### Commandes PHP
- **Exécuter une commande personnalisée** : Lancez n'importe quelle commande PHP dans votre container
- **Vider le cache Symfony** : Commande rapide pour `bin/console cache:clear`
- **Lancer les tests PHPUnit** : Exécute `bin/phpunit` dans le container

### Exploration de fichiers
- **Explorer les fichiers du workspace** : Ouvrez l'explorateur de fichiers VS Code
- **Parcourir les fichiers du container** : Naviguez dans l'arborescence des fichiers du container Docker

### Configuration
- **Configuration automatique** : Détection automatique des services Docker Compose
- **Sélection de fichiers** : Parcours, liste existante ou saisie manuelle
- **Configuration persistante** : Sauvegarde des paramètres par workspace

## 🏗️ Architecture Clean Code

L'extension suit les principes de Clean Architecture avec une séparation claire des responsabilités :

```
src/
├── types/           # Interfaces et types TypeScript
├── constants/       # Constantes et messages
├── utils/           # Utilitaires (gestion des fichiers)
├── services/        # Logique métier
│   ├── dockerService.ts      # Opérations Docker
│   └── configurationService.ts # Gestion de la configuration
├── commands/        # Gestionnaire de commandes
└── extension.ts     # Point d'entrée principal
```

### Avantages de cette architecture :
- **Séparation des responsabilités** : Chaque classe a une responsabilité unique
- **Testabilité** : Services facilement testables en isolation
- **Maintenabilité** : Code organisé et facile à modifier
- **Extensibilité** : Ajout de nouvelles fonctionnalités simplifié
- **Réutilisabilité** : Services réutilisables dans différents contextes

## 📦 Installation

1. Clonez ce repository
2. Installez les dépendances : `npm install`
3. Compilez l'extension : `npm run compile`
4. Installez l'extension dans VS Code

## ⚙️ Configuration

### Configuration automatique (recommandée)
1. Ouvrez la palette de commandes (`Ctrl+Shift+P`)
2. Tapez "Docker PHP: Configurer le container"
3. Suivez l'assistant de configuration

### Configuration manuelle
Ajoutez ces paramètres dans vos paramètres VS Code :

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker-compose.yml"
}
```

## 🎯 Utilisation

### Commandes disponibles
- `Ctrl+Shift+P` puis "Docker PHP: Exécuter une commande"
- `Ctrl+Shift+P` puis "Docker PHP: Vider le cache Symfony"
- `Ctrl+Shift+P` puis "Docker PHP: Lancer les tests PHPUnit"
- `Ctrl+Shift+P` puis "Docker PHP: Explorer les fichiers du workspace"
- `Ctrl+Shift+P` puis "Docker PHP: Parcourir les fichiers du container"

### Exemples d'utilisation
```bash
# Exécuter une commande personnalisée
bin/console doctrine:migrations:migrate

# Vider le cache
bin/console cache:clear

# Lancer les tests
bin/phpunit --filter=UserTest

# Installer des dépendances
composer install
```

## 🔧 Développement

### Structure du projet
- **TypeScript** : Langage principal
- **ESLint** : Linting du code
- **VS Code API** : Intégration avec l'éditeur

### Scripts disponibles
```bash
npm run compile    # Compilation TypeScript
npm run watch      # Compilation en mode watch
npm run lint       # Vérification du code
npm run test       # Exécution des tests
```

### Ajout de nouvelles fonctionnalités
1. Créez les types dans `src/types/`
2. Ajoutez les constantes dans `src/constants/`
3. Implémentez la logique dans `src/services/`
4. Créez la commande dans `src/commands/`
5. Mettez à jour `package.json`

## 🐛 Dépannage

### Problèmes courants
- **Container non trouvé** : Vérifiez que le container est en cours d'exécution
- **Service non reconnu** : Vérifiez le nom du service dans docker-compose.yml
- **Permissions** : Assurez-vous d'avoir les droits d'exécution Docker

### Logs
Les logs de l'extension sont disponibles dans le panneau de sortie "Docker PHP Runner".

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Signaler des bugs
2. Proposer des améliorations
3. Soumettre des pull requests

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Vérifiez les logs de l'extension

