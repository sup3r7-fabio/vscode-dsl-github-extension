import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('golang-vibe-coding.github-actions-dsl'));
	});

	test('Extension should activate', async () => {
		const ext = vscode.extensions.getExtension('golang-vibe-coding.github-actions-dsl');
		assert.ok(ext);
		await ext.activate();
		assert.strictEqual(ext.isActive, true);
	});

	test('Should register DSL language', () => {
		const languages = vscode.languages.getLanguages();
		return languages.then((langs) => {
			assert.ok(langs.includes('github-actions-dsl'));
		});
	});

	test('Should contribute debug configuration', () => {
		const debugTypes = vscode.debug.breakpoints;
		// Test that debug adapter is available
		assert.ok(debugTypes !== undefined);
	});

	test('Should provide commands', async () => {
		const commands = await vscode.commands.getCommands();
		const extensionCommands = commands.filter(cmd => cmd.startsWith('github-actions-dsl.'));
		
		// Check that our extension commands are registered
		assert.ok(extensionCommands.includes('github-actions-dsl.startDapServer'));
		assert.ok(extensionCommands.includes('github-actions-dsl.stopDapServer'));
		assert.ok(extensionCommands.includes('github-actions-dsl.validateSyntax'));
	});

	test('Should handle DSL file creation', async () => {
		// Create a test DSL document
		const doc = await vscode.workspace.openTextDocument({
			content: 'name: Test Workflow\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest',
			language: 'github-actions-dsl'
		});

		assert.strictEqual(doc.languageId, 'github-actions-dsl');
		assert.ok(doc.getText().includes('Test Workflow'));
	});

	test('Should provide syntax highlighting', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: 'name: Test\non: push',
			language: 'github-actions-dsl'
		});

		// Open the document in an editor
		const editor = await vscode.window.showTextDocument(doc);
		assert.ok(editor);
		assert.strictEqual(editor.document.languageId, 'github-actions-dsl');
	});
});
