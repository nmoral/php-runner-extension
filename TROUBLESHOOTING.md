# 🚨 Guide de dépannage - Docker PHP Runner

Ce guide vous aide à résoudre les problèmes courants rencontrés avec l'extension Docker PHP Runner.

## 🔧 Problème : Le sélecteur de fichier ne s'ouvre pas

### Symptômes
- L'option "📁 Parcourir et sélectionner un fichier..." ne fonctionne pas
- L'interface de sélection de fichier ne s'ouvre pas
- Erreur lors de la sélection du fichier docker-compose

### Solutions

#### Solution 1 : Utiliser l'option alternative
Si le sélecteur de fichier ne fonctionne pas, utilisez l'option **"📋 Sélectionner depuis une liste de fichiers existants"** qui :
- Détecte automatiquement les fichiers docker-compose existants
- Propose une liste de chemins valides
- Permet de saisir un chemin personnalisé

#### Solution 2 : Saisie manuelle
Utilisez l'option **"✏️ Saisir le chemin manuellement"** et entrez le chemin complet :
```
C:\Users\votre-nom\projet\docker-compose.yml
```

#### Solution 3 : Vérifier les permissions
- Assurez-vous que VS Code a les permissions pour accéder au système de fichiers
- Vérifiez que vous n'avez pas de restrictions de sécurité

#### Solution 4 : Redémarrer VS Code
- Fermez complètement VS Code
- Rouvrez VS Code
- Relancez la configuration

### Fallback automatique
L'extension inclut maintenant un système de fallback qui :
- Détecte automatiquement les erreurs du sélecteur
- Propose une saisie manuelle en cas de problème
- Affiche des messages d'erreur détaillés dans le canal de sortie

## 🚨 Autres problèmes courants

### Problème : "Configuration Docker manquante"
**Cause** : Aucun service ou container n'est configuré
**Solution** : Lancez `Docker PHP: Configurer le container`

### Problème : "Fichier docker-compose non trouvé"
**Cause** : Le fichier n'existe pas au chemin spécifié
**Solutions** :
1. Vérifiez que le fichier existe
2. Utilisez le sélecteur de fichier
3. Vérifiez les permissions d'accès

### Problème : "Service non trouvé"
**Cause** : Le service n'existe pas dans docker-compose.yml
**Solutions** :
1. Vérifiez le nom du service dans le fichier
2. Assurez-vous que le fichier est valide
3. Relancez la configuration

### Problème : Container non démarré
**Cause** : Le container Docker n'est pas en cours d'exécution
**Solution** : Lancez `docker-compose up -d` dans votre terminal

## 🔍 Diagnostic et logs

### Canal de sortie
L'extension affiche des informations détaillées dans le canal "Docker PHP Runner" :
1. Ouvrez la palette de commandes (`Ctrl+Shift+P`)
2. Tapez "View: Toggle Output"
3. Sélectionnez "Docker PHP Runner" dans la liste

### Informations affichées
- Tentatives d'ouverture du sélecteur de fichier
- Erreurs rencontrées
- Chemins sélectionnés
- Configuration sauvegardée

## 🛠️ Solutions avancées

### Réinitialiser la configuration
1. Ouvrez les paramètres VS Code (`Ctrl+,`)
2. Recherchez "dockerPhpRunner"
3. Supprimez les valeurs configurées
4. Relancez la configuration

### Vérifier la structure du projet
Assurez-vous que votre projet a une structure valide :
```
mon-projet/
├── docker-compose.yml          ← Fichier principal
├── docker-compose.override.yml ← Override (optionnel)
├── src/                        ← Code source
└── .vscode/                    ← Configuration VS Code
```

### Utiliser des chemins absolus
Si les chemins relatifs posent problème, utilisez des chemins absolus :
```json
{
  "dockerPhpRunner.dockerComposePath": "C:\\Users\\votre-nom\\projet\\docker-compose.yml"
}
```

## 📱 Support et assistance

### Vérifications préliminaires
1. **Version de VS Code** : 1.74.0 ou supérieur
2. **Système d'exploitation** : Windows, macOS, ou Linux
3. **Permissions** : Accès au système de fichiers
4. **Docker** : Installé et fonctionnel

### Ressources d'aide
1. **Documentation** : Voir `README.md`
2. **Guide rapide** : Voir `QUICKSTART.md`
3. **Démonstration** : Voir `DEMO.md`
4. **Exemples** : Voir `docker-compose.example.yml`

### Signaler un problème
Si le problème persiste :
1. Vérifiez les logs dans le canal de sortie
2. Notez les étapes qui reproduisent le problème
3. Incluez les informations de votre système
4. Décrivez le comportement attendu vs. observé

## 🎯 Prévention des problèmes

### Bonnes pratiques
1. **Utilisez des chemins courts** sans caractères spéciaux
2. **Vérifiez les permissions** avant la configuration
3. **Testez avec des commandes simples** d'abord
4. **Sauvegardez votre configuration** dans `.vscode/settings.json`

### Configuration recommandée
```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker-compose.yml"
}
```

---

**💡 Conseil** : Si le sélecteur de fichier ne fonctionne pas, utilisez l'option "📋 Sélectionner depuis une liste de fichiers existants" qui est plus fiable et offre les mêmes fonctionnalités !

**Extension Docker PHP Runner v0.0.3** 🚀
