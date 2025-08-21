# Docker PHP Runner Extension

A VS Code extension that makes running PHP commands in Docker containers as smooth as butter! 🐳☕

## ✨ What's the fuss about?

Ever found yourself switching between VS Code and your terminal to run `docker-compose exec app bin/console cache:clear`? Yeah, we've been there too. This extension puts all your Docker PHP commands right in VS Code's command palette, so you can stay in your coding flow.

## 🚀 Features that'll make your day

### PHP Commands (the good stuff)
- **Custom Command Runner**: Execute any PHP command in your container with style
- **Symfony Cache Clear**: One-click `bin/console cache:clear` (because who has time for cache issues?)
- **PHPUnit Tests**: Run `bin/phpunit` without leaving your editor
- **Saved Commands**: Save your favorite commands for quick access

### File Exploration
- **Workspace Explorer**: Browse your local files through VS Code
- **Container File Browser**: Navigate through your container's file structure

### Smart Configuration
- **Auto-detection**: Automatically finds your Docker Compose services
- **Flexible Setup**: Choose from existing files or enter paths manually
- **Workspace Persistence**: Your settings stick around (unlike that coffee you forgot about)

## 🛠️ Installation Guide

### Prerequisites
Before we dive in, make sure you have:
- **VS Code** (version 1.74.0 or higher)
- **Docker** and **Docker Compose** installed and running
- A PHP project with a `docker-compose.yml` file

### Method 1: From VSIX Package (Recommended)
1. Download the latest `.vsix` file from the releases page
2. In VS Code, go to **Extensions** (`Ctrl+Shift+X`)
3. Click the **"..."** menu and select **"Install from VSIX..."**
4. Choose your downloaded `.vsix` file
5. Restart VS Code when prompted

### Method 2: From Source (For the brave developers)
```bash
# Clone the repository
git clone https://github.com/nmoral/php-runner-extension.git
cd php-runner-extension

# Install dependencies
npm install

# Compile the extension
npm run compile

# Package the extension
npm run package

# Install the generated .vsix file in VS Code
```

## ⚙️ Configuration - Let's get you set up!

### Quick Setup (The lazy way - we approve!)
1. Open your PHP project in VS Code
2. Press `Ctrl+Shift+P` to open the command palette
3. Type "Docker PHP: Configure Container"
4. Follow the friendly setup wizard

The extension will automatically detect your Docker Compose services and guide you through the configuration. It's like having a helpful intern, but without the coffee runs!

### Manual Configuration (For the control freaks)
If you prefer to configure everything manually, add these settings to your VS Code workspace settings:

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerComposePath": "./docker-compose.yml",
  "dockerPhpRunner.dockerUser": "www-data"
}
```

### Configuration Options Explained

| Setting | Description | Default | Example |
|---------|-------------|---------|---------|
| `serviceName` | Your Docker service name | - | `"app"`, `"php"`, `"backend"` |
| `workingDirectory` | Working directory in container | `"/var/www/html"` | `"/app"`, `"/var/www"` |
| `phpExecutable` | PHP executable path | `"php"` | `"php8.2"`, `"/usr/local/bin/php"` |
| `dockerComposePath` | Path to docker-compose.yml | Auto-detected | `"./docker-compose.yml"` |
| `dockerUser` | Docker user for commands | Container default | `"www-data"`, `"1000:1000"` |

### Docker User Configuration
This is where it gets interesting! You can specify which user runs your commands:

- **`root`**: The classic "I do what I want" approach
- **`www-data`**: The web server way (recommended for production-like setups)
- **`1000:1000`**: The developer way (matches your local user ID)
- **Custom**: Whatever floats your boat

```json
{
  "dockerPhpRunner.dockerUser": "www-data"
}
```

## 🎯 How to Use (The fun part!)

### Available Commands
All commands are available through the command palette (`Ctrl+Shift+P`):

- **`Docker PHP: Run Command`** - Execute any PHP command
- **`Docker PHP: Clear Symfony Cache`** - Clear that pesky cache
- **`Docker PHP: Run PHPUnit Tests`** - Run your tests
- **`Docker PHP: Configure Container`** - Set up your container
- **`Docker PHP: Explore Workspace Files`** - Browse local files
- **`Docker PHP: Browse Container Files`** - Explore container files
- **`Docker PHP: Run Saved Command`** - Execute a saved command
- **`Docker PHP: Add Saved Command`** - Save a new command

### Saved Commands Feature
Save your frequently used commands for quick access:

```json
{
  "dockerPhpRunner.savedCommands": [
    {
      "label": "Clear All Caches",
      "command": "bin/console cache:clear"
    },
    {
      "label": "Database Migration",
      "steps": [
        "bin/console doctrine:migrations:migrate --no-interaction",
        "bin/console cache:clear"
      ]
    }
  ]
}
```

### Real-world Examples
Here are some commands you might actually use:

```bash
# Symfony commands
bin/console cache:clear
bin/console doctrine:migrations:migrate
bin/console make:entity User

# Composer commands
composer install
composer update
composer dump-autoload

# Testing
bin/phpunit
bin/phpunit --filter=UserTest
vendor/bin/phpstan analyse

# Custom scripts
php bin/console app:import-data
php scripts/deploy.php
```

## 🐛 Troubleshooting - When things go sideways

### Common Issues and Solutions

**"Container not found" error**
- Make sure your Docker containers are running: `docker-compose up -d`
- Check your service name in `docker-compose.yml`

**"Service not recognized" error**
- Verify your `docker-compose.yml` file exists
- Use the "Docker PHP: Choose Service" command for auto-completion

**Permission denied errors**
- Try changing the `dockerUser` setting to `root` temporarily
- Check your Docker Compose user configuration

**Commands not working as expected**
- Check the extension's output panel for detailed error messages
- Verify your `workingDirectory` setting matches your project structure

### Getting Help
- **Extension Output**: View detailed logs in the "Docker PHP Runner" output panel
- **Command Palette**: Use "Developer: Reload Window" if things get weird
- **GitHub Issues**: Found a bug? Let us know!

## 🏗️ Development - For the curious minds

### Project Structure
```
src/
├── types/           # TypeScript interfaces
├── constants/       # Constants and messages
├── utils/           # File utilities
├── services/        # Business logic
│   ├── dockerService.ts      # Docker operations
│   └── configurationService.ts # Configuration management
├── commands/        # Command handlers
└── extension.ts     # Main entry point
```

### Development Setup
```bash
# Install dependencies
npm install

# Compile in watch mode
npm run watch

# Run tests
npm run test

# Lint code
npm run lint

# Package extension
npm run package
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Report bugs** - Even the smallest issues matter
2. **Suggest features** - We're always looking for new ideas
3. **Submit pull requests** - Code contributions are welcome
4. **Improve documentation** - Help others understand the extension

## 📞 Support & Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/nmoral/php-runner-extension/issues)
- **Documentation**: Check the [Wiki](https://github.com/nmoral/php-runner-extension/wiki) for detailed guides
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/nmoral/php-runner-extension/discussions)

---

**Happy coding!** 🎉 Remember, the best code is the code that makes you smile (and doesn't break in production).

