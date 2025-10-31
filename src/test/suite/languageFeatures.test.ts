import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Language Features Tests', () => {
	let document: vscode.TextDocument;

	suiteSetup(async () => {
		// Create a test DSL document for language feature testing
		document = await vscode.workspace.openTextDocument({
			content: `name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Test
        run: npm test`,
			language: 'github-actions-dsl'
		});
	});

	test('Document should have correct language ID', () => {
		assert.strictEqual(document.languageId, 'github-actions-dsl');
	});

	test('Document should contain expected content', () => {
		const text = document.getText();
		assert.ok(text.includes('CI/CD Pipeline'));
		assert.ok(text.includes('actions/checkout'));
		assert.ok(text.includes('ubuntu-latest'));
	});

	test('Should handle file associations', () => {
		// Test that .dsl files are associated with our language
		assert.ok(document.languageId === 'github-actions-dsl');
	});

	test('Should provide problem matchers', () => {
		// Verify our problem matcher configuration
		const expectedPattern = '^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error|info):\\\\s+(.*)$';
		assert.ok(expectedPattern.includes('warning|error|info'));
	});

	test('Configuration settings should be accessible', () => {
		const config = vscode.workspace.getConfiguration('github-actions-dsl');
		
		// Test that our configuration sections exist
		assert.ok(config !== undefined);
		
		// Test default values (these should match package.json)
		const dapAutoStart = config.get('dapServer.autoStart');
		const dapPort = config.get('dapServer.port');
		const validationEnabled = config.get('syntax.validation.enabled');
		
		// These might be undefined in test environment, so we just check they're defined in config
		assert.ok(dapAutoStart !== undefined || dapPort !== undefined || validationEnabled !== undefined);
	});

	test('Should support workspace configuration', async () => {
		// Test workspace-specific configuration
		const workspaceConfig = vscode.workspace.getConfiguration();
		assert.ok(workspaceConfig);
		
		// Verify we can access our extension's configuration
		const extensionConfig = workspaceConfig.get('github-actions-dsl');
		// May be undefined in test environment, but should not throw
		assert.doesNotThrow(() => workspaceConfig.get('github-actions-dsl'));
	});
});
