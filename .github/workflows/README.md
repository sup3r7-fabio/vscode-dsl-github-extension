# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the VS Code extension CI/CD pipeline.

## Workflows Overview

### 🔄 CI (`ci.yml`)
**Trigger**: Push to `main`/`develop`, Pull Requests to `main`
- Runs on multiple OS (Ubuntu, macOS, Windows)
- Lints code, compiles TypeScript, runs tests
- Creates VSIX package artifact
- Provides feedback on PR status

### 🚀 Publish (`publish.yml`)
**Trigger**: Git tags (`v*`) and GitHub releases
- Runs full test suite on all platforms
- Only publishes if all tests pass
- Publishes to VS Code Marketplace
- Uploads VSIX to GitHub release
- **Requires**: `VSCE_PAT` secret

### 🧪 Pre-release (`pre-release.yml`)
**Trigger**: Push to `main` branch (excluding docs)
- Creates beta versions with timestamp
- Publishes to marketplace as pre-release
- Manual trigger available
- **Requires**: `VSCE_PAT` secret

### 🛠️ Manual Test (`manual-test.yml`)
**Trigger**: Manual dispatch
- Configurable OS matrix
- Optional test execution
- Optional VSIX creation
- Useful for debugging workflows

### 📦 Update Dependencies (`update-deps.yml`)
**Trigger**: Weekly schedule (Mondays) + Manual
- Updates npm dependencies
- Applies security fixes
- Runs tests to verify changes
- Creates PR with updates

## Setup Instructions

### 1. Create Personal Access Token (PAT)
1. Go to [Azure DevOps](https://dev.azure.com)
2. Sign in with your Microsoft account
3. Go to User Settings → Personal Access Tokens
4. Create token with **Marketplace (Manage)** scope
5. Copy the token

### 2. Add GitHub Secret
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `VSCE_PAT`
5. Value: Your PAT from step 1

### 3. Configure Publisher
Ensure your `package.json` has the correct publisher name that matches your VS Code Marketplace publisher account.

## Workflow Behavior

### Branch Protection
- `main` branch should require PR reviews
- CI must pass before merging
- Consider requiring linear history

### Release Process
1. **Development**: Work on feature branches
2. **Testing**: CI runs on PRs
3. **Pre-release**: Merge to `main` → automatic beta release
4. **Release**: Create git tag → full release to marketplace

### Version Management
- Update version in `package.json`
- Create git tag: `git tag v1.0.1`
- Push tag: `git push origin v1.0.1`
- Workflow automatically publishes

## Troubleshooting

### Common Issues

1. **VSCE_PAT Secret Missing**
   - Error: Authentication failed
   - Solution: Add VSCE_PAT secret to repository

2. **Tests Failing on Linux**
   - Error: Display not available
   - Solution: Workflows use `xvfb-run` for headless testing

3. **Package Size Too Large**
   - Error: Package exceeds size limits
   - Solution: Update `.vscodeignore` to exclude unnecessary files

4. **Publisher Mismatch**
   - Error: Publisher not found
   - Solution: Ensure `package.json` publisher matches marketplace account

### Debugging Workflows
- Check workflow logs in GitHub Actions tab
- Use manual test workflow for debugging
- Verify secrets are properly set
- Check VS Code marketplace for published versions

## Security Notes

- Never commit PAT tokens to repository
- Use GitHub secrets for sensitive data
- Regularly rotate access tokens
- Monitor workflow permissions

## Customization

### Adding New OS
Edit the matrix in workflow files:
```yaml
strategy:
  matrix:
    os: [macos-latest, ubuntu-latest, windows-latest, ubuntu-20.04]
```

### Changing Node Version
Update all workflows:
```yaml
- name: Install Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20.x  # Change version here
```

### Additional Testing
Add new steps to workflows:
```yaml
- name: Integration Tests
  run: npm run test:integration
  
- name: E2E Tests
  run: npm run test:e2e
```
