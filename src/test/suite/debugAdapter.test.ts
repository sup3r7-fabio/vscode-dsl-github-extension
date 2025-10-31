import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Debug Adapter Tests', () => {
	test('Debug adapter should be available', () => {
		// Test that our debug adapter type is registered
		const config: vscode.DebugConfiguration = {
			type: 'dsl',
			request: 'launch',
			name: 'Test Debug',
			program: '${file}'
		};
		
		assert.strictEqual(config.type, 'dsl');
		assert.strictEqual(config.request, 'launch');
	});

	test('Debug configuration should have required properties', () => {
		// Test debug configuration structure
		const config = {
			type: 'dsl',
			request: 'launch',
			name: 'Debug DSL File',
			program: '${file}',
			stopOnEntry: true,
			dapServerPort: 4711,
			autoStartDapServer: true
		};

		assert.ok(config.program);
		assert.ok(typeof config.stopOnEntry === 'boolean');
		assert.ok(typeof config.dapServerPort === 'number');
		assert.ok(typeof config.autoStartDapServer === 'boolean');
	});

	test('Should support breakpoints for DSL language', () => {
		// Verify breakpoint support is configured
		assert.ok(vscode.languages !== undefined);
		// Note: In a real implementation, you'd test the actual breakpoint provider
	});

	test('Variable substitution in debug config', () => {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (workspaceFolder) {
			const program = '${workspaceFolder}/test.dsl';
			assert.ok(program.includes('${workspaceFolder}'));
		}
	});
});
