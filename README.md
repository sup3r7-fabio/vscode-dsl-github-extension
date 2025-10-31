# Sup3r7 GitHub Actions DSL Syntax Highlighting - VSCode Extension

A Visual Studio Code extension that provides language support and debugging capabilities for GitHub Actions DSL files (.dsl extension).

## Features

### 🎨 Syntax Highlighting
- Full syntax highlighting for DSL files with `.dsl` extension
- Support for GitHub Actions workflow constructs
- Expression interpolation highlighting (`${{ }}`)
- Action reference highlighting (`owner/repo@version`)
- Event and runner label highlighting

### 🐛 Debugging Support
- Full Debug Adapter Protocol (DAP) integration
- Set breakpoints in DSL files
- Step through workflow execution
- Variable inspection and watch
- Call stack visualization
- Debug console with expression evaluation

### 🧠 IntelliSense & Language Features
- Auto-completion for workflow keywords
- Hover information for DSL constructs
- Real-time syntax validation
- Error highlighting and diagnostics

### ⚡ Commands & Tools
- **Start/Stop/Restart DAP Server**: Manage the debug server
- **Validate DSL Syntax**: Check syntax of current file
- **Show AST Visualization**: View abstract syntax tree
- **Open Debug Console**: Quick access to debug tools

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "GitHub Actions DSL"
4. Click Install

### From VSIX Package
1. Download the latest `.vsix` file from releases
2. Install in VSCode: `code --install-extension github-actions-dsl-1.0.0.vsix`

### From Source (Development)
1. Clone the repository: `git clone https://github.com/sup3r7-fabio/vscode-dsl-github-extension.git`
2. Navigate to the directory: `cd vscode-dsl-github-extension`
3. Install dependencies: `npm install`
4. Compile: `npm run compile`
5. Open in VSCode and press `F5` to launch extension development host

## Usage

### Basic Language Support
1. Create or open a file with `.dsl` extension
2. The extension automatically provides syntax highlighting
3. Use `Ctrl+Space` for auto-completion
4. Hover over keywords for documentation

### Debugging Workflows
1. Open a DSL file in VSCode
2. Set breakpoints by clicking in the editor gutter
3. Press `F5` or use "Run > Start Debugging"
4. Select "Debug DSL File" configuration
5. The extension will automatically start the DAP server if needed

### Debug Configuration
Add to your `.vscode/launch.json`:
```json
{
  "type": "dsl",
  "request": "launch",
  "name": "Debug DSL File",
  "program": "${file}",
  "stopOnEntry": true,
  "dapServerPort": 4711,
  "autoStartDapServer": true
}
```

## Commands

Access these commands via `Ctrl+Shift+P`:

- `GitHub Actions DSL: Start DAP Server` - Start the debug server
- `GitHub Actions DSL: Stop DAP Server` - Stop the debug server
- `GitHub Actions DSL: Restart DAP Server` - Restart the debug server
- `GitHub Actions DSL: Validate DSL Syntax` - Validate current file
- `GitHub Actions DSL: Show AST Visualization` - Show syntax tree
- `GitHub Actions DSL: Open Debug Console` - Open debug console

## Configuration

### Extension Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `github-actions-dsl.dapServer.autoStart` | `true` | Auto-start DAP server when debugging |
| `github-actions-dsl.dapServer.port` | `4711` | Default DAP server port |
| `github-actions-dsl.dapServer.host` | `localhost` | Default DAP server host |
| `github-actions-dsl.dapServer.executable` | `./bin/dsl-dap` | Path to DAP server executable |
| `github-actions-dsl.syntax.validation.enabled` | `true` | Enable real-time syntax validation |
| `github-actions-dsl.debug.verbose` | `false` | Enable verbose debug logging |
| `github-actions-dsl.ast.autoShow` | `false` | Auto-show AST when opening DSL files |

### File Associations
The extension automatically associates `.dsl` files with the GitHub Actions DSL language. You can also manually set the language mode using `Ctrl+K M`.

## Debugging Features

### Breakpoints
- **Line Breakpoints**: Click in the gutter to set/unset
- **Conditional Breakpoints**: Right-click breakpoint for conditions
- **Logpoints**: Add logging without stopping execution

### Variable Inspection
- **Variables Panel**: Shows workflow context, job info, step details
- **Watch Expressions**: Monitor specific values
- **Hover Evaluation**: Hover over variables to see values

### Debug Console
- Evaluate expressions in the current context
- Access workflow variables: `workflow.name`, `job.id`, `step.name`
- Check environment variables: `env.NODE_VERSION`

### Step Controls
- **Continue** (F5): Resume execution
- **Step Over** (F10): Execute next line
- **Step Into** (F11): Step into function calls  
- **Step Out** (Shift+F11): Step out of current function

## Requirements

### Prerequisites
- **Visual Studio Code**: Version 1.74.0 or higher
- **Node.js**: For development and building from source

### Dependencies
This extension includes all necessary dependencies and doesn't require external tools to function.

## Architecture

### Extension Components
- **Main Extension** (`src/extension.ts`): Core functionality and command registration
- **Debug Adapter** (`src/debugAdapter.ts`): DAP integration and communication
- **Language Configuration** (`language-configuration.json`): Language behavior settings
- **Syntax Grammar** (`syntaxes/dsl.tmGrammar.json`): TextMate grammar for highlighting

### File Structure
```
vscode-extension/
├── src/
│   ├── extension.ts          # Main extension logic
│   ├── debugAdapter.ts       # Debug adapter implementation
│   └── test/                 # Test suite
├── syntaxes/
│   └── dsl.tmGrammar.json   # Syntax highlighting rules
├── language-configuration.json # Language settings
├── package.json             # Extension manifest
└── README.md                # This file
```

## Development

### Extension Development
1. Clone the repository: `git clone https://github.com/sup3r7-fabio/vscode-dsl-github-extension.git`
2. Navigate to the directory: `cd vscode-dsl-github-extension`
3. Install dependencies: `npm install`
4. Compile TypeScript: `npm run compile`
5. Press `F5` to launch extension development host
6. Open a `.dsl` file to test features

### Testing the Extension
The extension includes a comprehensive test suite:
```bash
npm test              # Run all tests using VS Code Test CLI
npm run test:manual   # Run tests using custom runner
```

### Debugging the Extension
1. Set breakpoints in TypeScript files (`src/*.ts`)
2. Use the Extension Development Host (F5)
3. Check the Debug Console for logs
4. Use "Developer: Reload Window" to reload changes
5. View test results and coverage reports

### Building and Testing

Available npm scripts:
```bash
npm run compile        # Compile TypeScript to JavaScript
npm run watch         # Watch mode for development
npm run lint          # Run ESLint on source code
npm test             # Run extension tests
npm run package      # Build VSIX package
npm run publish      # Publish to marketplace
```

### Building VSIX Package
```bash
npm run package
# Creates: github-actions-dsl-1.0.0.vsix
```

## Example DSL File

```yaml
# example.dsl
name: Test Workflow with Advanced Features
on: 
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  BUILD_TYPE: production

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Run Tests
        run: npm test
        env:
          CI: true
```

## Troubleshooting

### Common Issues

#### Extension Not Activating
- Check that `.dsl` files are present in workspace
- Verify extension is enabled in VSCode
- Check Output panel for error messages

#### Syntax Highlighting Missing
- Ensure file has `.dsl` extension
- Try setting language mode manually: `Ctrl+K M` → "GitHub Actions DSL"
- Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"

#### Debugging Not Working
- Check DAP server port is available: `netstat -an | findstr 4711`
- Enable verbose logging in settings
- Check Debug Console for error messages
- Ensure extension is properly compiled: `npm run compile`

#### Auto-completion Not Working
- Ensure cursor is in valid context (after keywords)
- Try triggering manually with `Ctrl+Space`
- Check that language server features are enabled

### Debug Information
Enable verbose logging:
1. Open Settings: `Ctrl+,`
2. Search for "github-actions-dsl"
3. Enable "Debug: Verbose"
4. Check Output panel → "GitHub Actions DSL"

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with sample DSL files
5. Submit a pull request

## License

See the LICENSE file for license terms.

## Support

- 📖 Documentation: See this README and inline documentation
- 🐛 Issues: Report bugs at [GitHub Issues](https://github.com/sup3r7-fabio/vscode-dsl-github-extension/issues)
- 💬 Discussions: Use [GitHub Discussions](https://github.com/sup3r7-fabio/vscode-dsl-github-extension/discussions) for questions

## Related

- [Repository](https://github.com/sup3r7-fabio/vscode-dsl-github-extension)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/publishers/sup3r7-fabio)
