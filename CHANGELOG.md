# Changelog
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
