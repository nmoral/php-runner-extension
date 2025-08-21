# Changelog

## [1.0.0-RC3] - 2025-01-XX

### 🔇 Réduit
- **Logs et messages d'information** : Réduction significative des logs pour une expérience utilisateur plus silencieuse
  - Suppression de l'echo "Exécution de: [commande]" avant chaque commande
  - Suppression des messages de succès "Commande exécutée avec succès"
  - Suppression des messages de confirmation pour les commandes enregistrées
  - Suppression des messages de configuration (chemin docker-compose, service sélectionné)
  - Suppression des logs de démarrage de l'extension
  - Suppression des logs de débogage dans la console
  - Suppression de la méthode `displayCommandOutput` inutilisée

### 🔧 Amélioré
- **Expérience utilisateur** : Interface plus silencieuse et moins intrusive
- **Performance** : Moins de logs à traiter et afficher
- **Code** : Suppression du code inutilisé et des logs redondants

### 📝 Conservation
- **Logs d'erreur** : Conservés pour le débogage
- **Messages informatifs** : "Aucun fichier trouvé" et "Aucune commande enregistrée" conservés
- **Logs de configuration** : Conservés dans le canal de sortie pour le débogage

## [0.3.3] - 2025-08-21

### 🐛 Corrigé
- **Affichage des codes de couleur ANSI** : Correction du problème d'affichage des caractères de contrôle ANSI dans le terminal
  - Suppression des codes de couleur `\u001b[1m`, `\u001b[36m`, `\u001b[0m` qui s'affichaient comme des caractères bruts
  - Remplacement par un simple `echo` pour afficher la commande exécutée
  - Résolution du problème `zsh: command not found: mExécution` dans le terminal

## [0.3.2] - 2025-01-XX

### ✨ Ajouté
- **Configuration de l'utilisateur Docker** : Possibilité de définir l'utilisateur utilisé dans les commandes docker compose
  - Option `dockerUser` dans la configuration du workspace
  - Interface de sélection avec options communes (root, www-data, 1000:1000, etc.)
  - Support de l'option `--user` dans les commandes `docker compose exec` et `docker exec`
  - Configuration éditable au niveau du workspace

### 🔧 Amélioré
- **Sécurité** : Possibilité d'éviter d'exécuter les commandes en tant que root
- **Permissions** : Support pour utiliser des utilisateurs spécifiques et éviter les problèmes de permissions
- **Développement** : Support des UID/GID locaux pour éviter les problèmes de propriété des fichiers

### 🧪 Tests
- Ajout de tests pour la nouvelle fonctionnalité `dockerUser`
- Tests de construction des commandes Docker avec l'option `--user`
- Tests de configuration pour la propriété `dockerUser`

## [0.2.0] - 2025-08-21

### 🐛 Corrigé
- Remplacement des appels `docker-compose` par `docker compose` dans l'exécution des commandes et la résolution des containers.

### 🧪 Tests
- Ajout d'une suite de tests (Mocha + Chai) pour vérifier la construction des commandes Docker.

### 📦 Build
- Ajout de la génération de couverture (c8) et d'un rapport `lcov`.


Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [0.1.0] - 2024-12-19

### ✨ Ajouté
- **Nouvelle commande** : `Docker PHP: Explorer les fichiers du workspace`
  - Ouvre l'explorateur de fichiers VS Code
  - Permet de naviguer dans la structure du projet
- **Nouvelle commande** : `Docker PHP: Parcourir les fichiers du container`
  - Navigation interactive dans l'arborescence du container Docker
  - Interface avec icônes emoji (📁 dossiers, 📄 fichiers)
  - Boutons de navigation (⬆️ retour parent, 🏠 retour racine)
  - Ouverture de fichiers avec coloration syntaxique
  - Détection automatique du langage des fichiers

### 🏗️ Refactorisé
- **Architecture Clean Code** : Restructuration complète du code
  - Séparation des responsabilités en services distincts
  - Types et interfaces centralisés dans `src/types/`
  - Constantes et messages dans `src/constants/`
  - Utilitaires dans `src/utils/`
  - Services métier dans `src/services/`
  - Gestionnaire de commandes dans `src/commands/`
- **Amélioration de la maintenabilité** : Code plus organisé et testable
- **Extensibilité** : Architecture modulaire facilitant l'ajout de fonctionnalités

### 🔧 Amélioré
- **Gestion des erreurs** : Messages d'erreur plus informatifs
- **Validation** : Vérification des configurations en temps réel
- **Interface utilisateur** : Navigation plus intuitive dans les containers
- **Documentation** : README et DEMO mis à jour avec les nouvelles fonctionnalités

### 📁 Structure des fichiers
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

## [0.0.3] - 2024-12-19

### ✨ Ajouté
- Support des services Docker Compose
- Configuration automatique des containers
- Interface de sélection de fichiers docker-compose.yml
- Détection automatique des services PHP
- Validation des configurations

### 🔧 Amélioré
- Interface utilisateur plus intuitive
- Gestion des erreurs améliorée
- Messages d'information contextuels

## [0.0.2] - 2024-12-19

### ✨ Ajouté
- Commandes prédéfinies pour Symfony et PHPUnit
- Configuration des containers Docker
- Support des répertoires de travail personnalisés

### 🔧 Amélioré
- Gestion des exécutables PHP
- Validation des paramètres

## [0.0.1] - 2024-12-19

### ✨ Ajouté
- Première version de l'extension
- Exécution de commandes PHP dans des containers Docker
- Interface de base pour la configuration
- Support des containers Docker et Docker Compose

---

## Format du Changelog

Ce projet suit le [Conventional Changelog](https://conventionalchangelog.org/).

### Types de changements

- **✨ Nouvelles fonctionnalités** : Ajout de nouvelles fonctionnalités
- **🔧 Améliorations** : Amélioration des fonctionnalités existantes
- **🐛 Corrections de bugs** : Correction de problèmes
- **📚 Documentation** : Mise à jour de la documentation
- **🎨 Expérience utilisateur** : Améliorations de l'interface utilisateur
- **⚡ Performance** : Améliorations des performances
- **🔒 Sécurité** : Corrections de sécurité
- **♻️ Refactoring** : Refactorisation du code
- **🧪 Tests** : Ajout ou amélioration des tests
- **📦 Build** : Modifications du système de build

### Structure des versions

- **MAJOR.MINOR.PATCH** : Format sémantique
- **MAJOR** : Changements incompatibles avec les versions précédentes
- **MINOR** : Nouvelles fonctionnalités compatibles
- **PATCH** : Corrections de bugs compatibles
