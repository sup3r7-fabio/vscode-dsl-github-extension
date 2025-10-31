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
  },
  env: {
    NODE_ENV: 'test'
  }
});
