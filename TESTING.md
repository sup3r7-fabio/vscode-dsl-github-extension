# Testing Guide for VS Code Extension

This document explains the comprehensive testing setup for the GitHub Actions DSL VS Code extension using the official VS Code testing tools.

## Test Infrastructure

### Dependencies
- `@vscode/test-cli` - Official CLI for running VS Code extension tests
- `@vscode/test-electron` - Programmatic API for running tests  
- `mocha` - Test framework
- `@types/mocha` - TypeScript definitions for Mocha

### Configuration Files

#### `.vscode-test.js`
Primary configuration for the VS Code test CLI:
```javascript
const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig({
  files: 'out/test/**/*.test.js',
  version: 'insiders',
  workspaceFolder: './test-workspace',
  mocha: {
    ui: 'tdd',
    timeout: 20000,
    color: true
  },
  coverage: {
    enabled: true,
    include: 'out/src/**/*.js',
    exclude: ['out/test/**', 'out/src/test/**'],
    reporter: ['text', 'html', 'lcov'],
    reportsDir: 'coverage'
  }
});
```

## Test Structure

```
src/test/
├── runTest.ts              # Custom test runner using @vscode/test-electron
├── suite/
│   ├── index.ts           # Test suite loader/runner
│   ├── extension.test.ts   # Main extension functionality tests
│   ├── debugAdapter.test.ts # Debug adapter specific tests
│   └── languageFeatures.test.ts # Language feature tests
└── test-workspace/
    └── sample.dsl         # Sample files for testing
```

## Running Tests

### Command Line
```bash
# Run all tests using VS Code Test CLI
npm test

# Run tests manually using custom runner
npm run test:manual

# Run tests in VS Code Stable (instead of Insiders)
VSCODE_TEST_VERSION=stable npm test
```

### VS Code Debug Configurations

#### Available Debug Configs
1. **Run Extension** - Launch extension in development mode
2. **Run Extension Tests** - Debug tests in current VS Code version
3. **Run Extension Tests (Stable)** - Debug tests in VS Code Stable
4. **Run Extension Tests (Insiders)** - Debug tests in VS Code Insiders  
5. **Run Extension Tests (Manual Runner)** - Debug using custom runner

#### Usage
1. Open VS Code in your extension workspace
2. Go to Run and Debug view (Ctrl+Shift+D)
3. Select desired configuration
4. Press F5 or click the play button

### Tasks
Use Ctrl+Shift+P → "Tasks: Run Task":
- **npm: test** - Run test suite
- **npm: compile** - Compile TypeScript
- **Run Tests in Stable** - Force Stable version
- **Run Tests in Insiders** - Force Insiders version

## Test Categories

### 1. Extension Tests (`extension.test.ts`)
Tests core extension functionality:
- Extension activation
- Command registration
- Language registration
- Configuration access
- Document handling

### 2. Debug Adapter Tests (`debugAdapter.test.ts`)
Tests debug-related features:
- Debug configuration validation
- Breakpoint support
- Variable substitution
- DAP integration

### 3. Language Features Tests (`languageFeatures.test.ts`)
Tests language support features:
- File associations
- Syntax highlighting
- Problem matchers
- Configuration settings

## Test Utilities

### Sample Test Structure
```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('My Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
  });

  test('Extension should activate', async () => {
    const ext = vscode.extensions.getExtension('publisher.extension-name');
    assert.ok(ext);
    await ext.activate();
    assert.strictEqual(ext.isActive, true);
  });
});
```

### Creating Test Documents
```typescript
// Create in-memory document for testing
const doc = await vscode.workspace.openTextDocument({
  content: 'test content',
  language: 'github-actions-dsl'
});

// Open document in editor
const editor = await vscode.window.showTextDocument(doc);
```

## Coverage Reports

Coverage is automatically generated when running tests:
- **Console output**: Basic coverage summary
- **HTML report**: `coverage/index.html` (open in browser)
- **LCOV format**: `coverage/lcov.info` (for CI integration)

## VS Code Version Targeting

### Default Behavior
- Tests run in VS Code Insiders by default
- Can be overridden via environment variables or config

### Version Selection
```bash
# Use specific version
VSCODE_TEST_VERSION=stable npm test
VSCODE_TEST_VERSION=insiders npm test

# Use specific version number
VSCODE_TEST_VERSION=1.74.0 npm test
```

### In Configuration
```javascript
// .vscode-test.js
module.exports = defineConfig({
  version: 'stable', // or 'insiders' or '1.74.0'
  // ... other config
});
```

## CI/CD Integration

### GitHub Actions
Tests are automatically run in CI:
```yaml
- name: Run tests (Linux)
  run: xvfb-run -a npm test
  if: runner.os == 'Linux'

- name: Run tests (macOS/Windows)  
  run: npm test
  if: runner.os != 'Linux'
```

### Cross-platform Testing
- **Linux**: Uses `xvfb-run` for headless testing
- **macOS/Windows**: Runs tests directly
- **Multiple OS**: CI matrix tests on Ubuntu, macOS, Windows

## Debugging Tests

### Common Issues
1. **Extension not found**: Check publisher/extension name in tests
2. **Activation timeout**: Increase timeout in Mocha config
3. **Commands not registered**: Ensure extension activates before testing commands
4. **File associations**: Test with actual files in test workspace

### Debug Tips
1. Use `console.log()` in tests for debugging
2. Set breakpoints in test files when using debug configurations
3. Check VS Code Developer Console for errors
4. Use `vscode.window.showInformationMessage()` for test output

### Environment Variables
```bash
# Enable verbose logging
DEBUG=vscode-test npm test

# Set test environment
NODE_ENV=test npm test

# Custom test workspace
VSCODE_TEST_WORKSPACE=/path/to/test/files npm test
```

## Best Practices

### Test Organization
1. **Group related tests** in suites using `suite()`
2. **Use descriptive names** for tests and suites
3. **Test one thing per test** for clarity
4. **Use setup/teardown** with `suiteSetup()`, `suiteTeardown()`

### Extension Testing
1. **Test activation** before testing features
2. **Verify commands exist** before calling them
3. **Use async/await** for extension APIs
4. **Clean up resources** (documents, editors) after tests

### Performance
1. **Share expensive setup** across tests in suite
2. **Use test workspace files** instead of creating many in-memory docs
3. **Avoid unnecessary VS Code instance launches**
4. **Group fast and slow tests** appropriately

### Error Handling
1. **Use specific assertions** (`strictEqual` vs `equal`)
2. **Test error conditions** not just happy paths
3. **Provide helpful error messages** in assertions
4. **Catch and verify thrown errors**

## Troubleshooting

### Common Problems

#### Tests not running
```bash
# Check compilation
npm run compile

# Verify test files exist
ls out/test/**/*.test.js

# Check configuration
cat .vscode-test.js
```

#### Extension not activating
```typescript
// Wait for activation
await vscode.extensions.getExtension('publisher.name')?.activate();

// Check activation events in package.json
// Ensure workspace contains trigger files
```

#### VS Code version issues
```bash
# Clear downloaded VS Code versions
rm -rf .vscode-test/

# Force specific version
VSCODE_TEST_VERSION=1.74.0 npm test
```

#### Permission errors (Linux)
```bash
# Use xvfb for headless testing
xvfb-run -a npm test

# Install required packages
sudo apt-get install xvfb
```

### Getting Help
1. Check [VS Code Extension Testing Guide](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
2. Review [test-electron documentation](https://github.com/microsoft/vscode-test)
3. Look at [sample extension tests](https://github.com/microsoft/vscode-extension-samples)
4. Ask on [VS Code Discord](https://discord.gg/vscode) #extension-authoring

## Future Enhancements

### Potential Additions
1. **E2E tests** for complete user workflows
2. **Performance tests** for extension startup time
3. **Integration tests** with actual DSL parser
4. **Snapshot testing** for syntax highlighting
5. **Mock services** for DAP server testing

### Advanced Scenarios
1. **Multi-root workspace** testing
2. **Extension pack** testing
3. **Custom settings** testing
4. **Internationalization** testing
5. **Accessibility** testing
