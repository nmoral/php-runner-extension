# Changelog

All notable changes to the "Docker PHP Runner" extension will be documented in this file.

## [1.0.0] - 2024-12-19

### Added
- Initial release of Docker PHP Runner extension
- Custom command execution in Docker containers
- Symfony cache clearing functionality
- PHPUnit test execution
- Saved commands feature with workspace persistence
- File exploration for both workspace and container
- Smart Docker Compose service auto-detection
- Configuration wizard for easy setup
- Support for custom Docker users and working directories
- Command palette integration with all features

### Features
- **Command Execution**: Run any PHP command in Docker containers
- **Symfony Integration**: One-click cache clearing and console commands
- **Testing Support**: Execute PHPUnit tests directly from VS Code
- **Saved Commands**: Save and organize frequently used commands
- **File Management**: Browse files in both workspace and containers
- **Smart Configuration**: Auto-detection of Docker Compose services
- **Flexible Setup**: Support for custom paths and user configurations

### Technical
- TypeScript implementation with full type safety
- Comprehensive test coverage
- ESLint configuration for code quality
- VS Code extension API integration
- Docker and Docker Compose command execution
- Workspace configuration management

---

## [1.0.0-RC3] - 2024-12-18

### Fixed
- ANSI color code handling in terminal output
- Command execution formatting issues
- Service name auto-completion improvements

## [1.0.0-RC2] - 2024-12-17

### Fixed
- Terminal output formatting with proper ANSI code handling
- Command execution reliability improvements

## [1.0.0-RC1] - 2024-12-16

### Added
- Initial beta release with core functionality
- Basic Docker command execution
- Configuration management
- Command palette integration
