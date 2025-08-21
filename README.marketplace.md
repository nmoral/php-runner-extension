# Docker PHP Runner

Execute PHP commands in Docker containers directly from VS Code with an intuitive interface! 🐳☕

## ✨ Features

- **Custom Command Runner**: Execute any PHP command in your container
- **Symfony Cache Clear**: One-click `bin/console cache:clear`
- **PHPUnit Tests**: Run `bin/phpunit` without leaving your editor
- **Saved Commands**: Save your favorite commands for quick access
- **File Exploration**: Browse both workspace and container files
- **Smart Configuration**: Auto-detection of Docker Compose services

## 🚀 Quick Start

1. Open your PHP project in VS Code
2. Press `Ctrl+Shift+P` and type "Docker PHP: Configure Container"
3. Follow the setup wizard
4. Start running PHP commands directly from the command palette!

## 🎯 Common Commands

- **`Docker PHP: Run Command`** - Execute any PHP command
- **`Docker PHP: Clear Symfony Cache`** - Clear Symfony cache
- **`Docker PHP: Run PHPUnit Tests`** - Run your tests
- **`Docker PHP: Run Saved Command`** - Execute saved commands

## ⚙️ Configuration

The extension automatically detects your Docker Compose services. You can also configure manually:

```json
{
  "dockerPhpRunner.serviceName": "app",
  "dockerPhpRunner.workingDirectory": "/var/www/html",
  "dockerPhpRunner.phpExecutable": "php",
  "dockerPhpRunner.dockerUser": "www-data"
}
```

## 🐛 Troubleshooting

- Make sure your Docker containers are running: `docker-compose up -d`
- Check the extension's output panel for detailed error messages
- Use "Developer: Reload Window" if needed

## 📝 Requirements

- VS Code 1.74.0 or higher
- Docker and Docker Compose installed
- PHP project with docker-compose.yml

---

**Happy coding!** 🎉 Stay in your development flow with Docker PHP Runner.
