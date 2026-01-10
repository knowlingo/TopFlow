# Workflow-Core Package Development Guide

This guide explains how to develop, publish, and manage the `@charliesu/workflow-core` package used across TopFlow and TaraFlow applications.

## Table of Contents

- [Overview](#overview)
- [Package Architecture](#package-architecture)
- [Development Setup](#development-setup)
- [Local Development Workflow](#local-development-workflow)
- [Publishing to npm](#publishing-to-npm)
- [Consuming in Applications](#consuming-in-applications)
- [Versioning Strategy](#versioning-strategy)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

**@charliesu/workflow-core** is a shared React Flow-based workflow orchestration engine used by:
- **TopFlow** - Security-focused AI workflow builder
- **TaraFlow** - (Future) Enterprise workflow platform

**Package Location**: `/home/ubuntu/Projects/school/workflow-core`
**npm Package**: [@charliesu/workflow-core](https://www.npmjs.com/package/@charliesu/workflow-core)
**Repository**: https://github.com/charliesu/workflow-core

---

## Package Architecture

### Core Components

```
workflow-core/
├── src/
│   ├── core/              # Core execution engine
│   ├── nodes/             # Node type definitions
│   ├── validation/        # Workflow validation logic
│   ├── types/             # TypeScript type definitions
│   └── index.ts           # Public API exports
├── dist/                  # Compiled output (auto-generated)
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
├── .npmignore             # npm publish exclusions
└── README.md              # Package documentation
```

### Key Features

- **TypeScript-first**: Full type safety with exported types
- **React Flow integration**: Compatible with @xyflow/react
- **Vercel AI SDK support**: Built-in AI provider integrations
- **Security-focused**: SSRF prevention, input sanitization, rate limiting
- **Framework-agnostic core**: Can be used in any React application

---

## Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 8+ (package manager)
- Git
- npm account (for publishing)

### Initial Setup

1. **Clone the repository**:
   ```bash
   cd /home/ubuntu/Projects/school
   git clone https://github.com/charliesu/workflow-core.git
   cd workflow-core
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Build the package**:
   ```bash
   pnpm build
   ```

4. **Verify build output**:
   ```bash
   ls -la dist/
   # Should see: index.js, index.d.ts, etc.
   ```

---

## Local Development Workflow

### Method 1: Using pnpm link (Recommended)

This method creates a symlink to your local workflow-core, allowing real-time development.

**In workflow-core directory**:
```bash
cd /home/ubuntu/Projects/school/workflow-core
pnpm link --global
```

**In TopFlow directory**:
```bash
cd /home/ubuntu/Projects/school/topflow
pnpm link --global @charliesu/workflow-core
```

**Development cycle**:
```bash
# In workflow-core: make changes, rebuild
cd /home/ubuntu/Projects/school/workflow-core
# Edit files...
pnpm build

# In TopFlow: changes are automatically available
cd /home/ubuntu/Projects/school/topflow
pnpm dev  # Will use linked version
```

**Unlink when done**:
```bash
# In TopFlow
pnpm unlink @charliesu/workflow-core

# In workflow-core
pnpm unlink --global
```

### Method 2: Using file: dependency (Quick testing)

**In TopFlow's package.json**:
```json
{
  "dependencies": {
    "@charliesu/workflow-core": "file:../workflow-core"
  }
}
```

Then run:
```bash
pnpm install
```

**⚠️ Warning**: This method does NOT work with Vercel deployment. Only use for local testing.

### Method 3: Publishing alpha versions (Production-like testing)

Publish a test version to npm:
```bash
cd /home/ubuntu/Projects/school/workflow-core
npm version 0.0.X-alpha  # Increment X
npm publish
```

Then in TopFlow:
```bash
pnpm update @charliesu/workflow-core
```

---

## Publishing to npm

### Publishing Workflow

#### 1. Prepare for Release

**Check status**:
```bash
cd /home/ubuntu/Projects/school/workflow-core
git status  # Should be clean
pnpm build  # Verify build works
```

**Run tests** (if available):
```bash
pnpm test
```

**Review changes**:
```bash
git log --oneline -10
```

#### 2. Update Version

Follow [semantic versioning](https://semver.org/):

**Alpha/Beta releases** (work in progress):
```bash
npm version 0.0.1-alpha    # First alpha
npm version 0.0.2-alpha    # Next alpha
npm version 0.1.0-beta     # First beta
```

**Patch release** (bug fixes):
```bash
npm version patch  # 1.0.0 → 1.0.1
```

**Minor release** (new features, backward compatible):
```bash
npm version minor  # 1.0.1 → 1.1.0
```

**Major release** (breaking changes):
```bash
npm version major  # 1.1.0 → 2.0.0
```

#### 3. Publish to npm

**For alpha/beta**:
```bash
npm publish --tag alpha
# Or
npm publish --tag beta
```

**For stable releases**:
```bash
npm publish --access public
```

#### 4. Push to Git

```bash
git push
git push --tags
```

#### 5. Create GitHub Release (Optional)

```bash
gh release create v1.0.0 --title "v1.0.0" --notes "Release notes here"
```

### Publishing Checklist

Before each publish:
- [ ] All tests passing
- [ ] Build succeeds (`pnpm build`)
- [ ] Git working directory clean
- [ ] README.md up to date
- [ ] CHANGELOG.md updated (for stable releases)
- [ ] Version number follows semver
- [ ] Breaking changes documented (for major versions)

---

## Consuming in Applications

### TopFlow Integration

**Installation**:
```bash
cd /home/ubuntu/Projects/school/topflow
pnpm add @charliesu/workflow-core@latest
```

**Usage in code**:
```typescript
import {
  TopFlowExecutionEngine,
  validateWorkflow,
  type WorkflowNode,
  type WorkflowEdge
} from '@charliesu/workflow-core'

// Use the execution engine
const engine = new TopFlowExecutionEngine()
const result = await engine.execute(nodes, edges, apiKeys)

// Use validation
const validation = validateWorkflow(nodes, edges, apiKeys)
```

**Update to latest**:
```bash
pnpm update @charliesu/workflow-core
```

**Update to specific version**:
```bash
pnpm add @charliesu/workflow-core@0.0.5-alpha
```

### TaraFlow Integration (Future)

Same process as TopFlow:

**In TaraFlow's package.json**:
```json
{
  "dependencies": {
    "@charliesu/workflow-core": "^1.0.0"
  }
}
```

**Install**:
```bash
cd /path/to/taraflow
pnpm install
```

**Usage**:
```typescript
import { TopFlowExecutionEngine } from '@charliesu/workflow-core'

// Configure for TaraFlow-specific needs
const engine = new TopFlowExecutionEngine({
  rateLimit: 20,  // Custom rate limit
  timeout: 60000  // Custom timeout
})
```

### Dependency Management

**Lock to specific version** (production):
```json
"@charliesu/workflow-core": "1.0.0"
```

**Allow patch updates** (recommended):
```json
"@charliesu/workflow-core": "^1.0.0"
// Allows 1.0.x, blocks 1.1.0
```

**Allow minor updates** (more flexible):
```json
"@charliesu/workflow-core": "~1.0.0"
// Allows 1.x.x, blocks 2.0.0
```

**Use alpha/beta**:
```json
"@charliesu/workflow-core": "^0.0.1-alpha"
```

---

## Versioning Strategy

### Version Progression

```
Development → Alpha → Beta → Stable
0.0.1-alpha   0.1.0-beta   1.0.0
```

### When to Use Each

**Alpha (0.0.x-alpha)**:
- Active development
- API may change frequently
- Internal testing
- Not recommended for production

**Beta (0.x.0-beta)**:
- Feature complete
- API mostly stable
- Public testing
- Near production-ready

**Release Candidate (1.0.0-rc.1)**:
- Final testing before stable
- No new features
- Bug fixes only

**Stable (1.0.0+)**:
- Production-ready
- Follows semantic versioning
- Breaking changes require major version bump

### Version Naming Convention

```
<major>.<minor>.<patch>-<prerelease>

Examples:
0.0.1-alpha.1   - First alpha
0.0.1-alpha.2   - Second alpha
0.1.0-beta      - First beta
1.0.0-rc.1      - Release candidate 1
1.0.0           - First stable release
1.0.1           - Bug fix
1.1.0           - New features (backward compatible)
2.0.0           - Breaking changes
```

---

## Best Practices

### Development Workflow

1. **Always work on a feature branch**:
   ```bash
   git checkout -b feature/new-validation-rule
   ```

2. **Write descriptive commit messages**:
   ```bash
   git commit -m "feat: add SSRF protection for HTTP request nodes"
   git commit -m "fix: resolve edge case in conditional execution"
   ```

3. **Test before publishing**:
   - Build locally: `pnpm build`
   - Test in TopFlow using `pnpm link`
   - Publish alpha for staging tests

4. **Document breaking changes**:
   ```typescript
   // BREAKING CHANGE: executeWorkflow now returns Promise<ExecutionResult>
   // Migration: await executeWorkflow() instead of executeWorkflow()
   ```

### Code Quality

**Type safety**:
```typescript
// ✅ Good: Export types for consumers
export type WorkflowNode = {
  id: string
  type: string
  data: Record<string, any>
}

// ❌ Bad: Using 'any' without necessity
export function validate(workflow: any): any
```

**Tree-shakeable exports**:
```typescript
// ✅ Good: Named exports
export { validateWorkflow, executeWorkflow }

// ❌ Bad: Default export of object
export default { validateWorkflow, executeWorkflow }
```

**Minimal dependencies**:
- Only include dependencies needed by consumers
- Use `peerDependencies` for React, ReactFlow, etc.
- Keep bundle size small

### Documentation

**Update README.md** when:
- Adding new public APIs
- Changing function signatures
- Adding new features
- Fixing significant bugs

**Use JSDoc comments**:
```typescript
/**
 * Validates a workflow for structural and configuration errors
 * @param nodes - Array of workflow nodes
 * @param edges - Array of workflow edges
 * @param apiKeys - Optional API keys for validation
 * @returns Validation result with errors, warnings, and score
 */
export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
  apiKeys?: Record<string, string>
): ValidationResult
```

---

## Troubleshooting

### Build Issues

**Problem**: TypeScript compilation errors
```bash
error TS2304: Cannot find name 'ReactNode'
```

**Solution**: Ensure all types are properly imported:
```typescript
import type { ReactNode } from 'react'
```

---

### Publishing Issues

**Problem**: `npm ERR! 403 Forbidden`
```
npm ERR! 403 You do not have permission to publish
```

**Solution**: Login to npm:
```bash
npm login
npm whoami  # Verify logged in
```

---

**Problem**: `Git working directory not clean`
```
npm ERR! Git working directory not clean
```

**Solution**: Commit or stash changes:
```bash
git status
git add .
git commit -m "chore: prepare for release"
```

---

### Version Conflicts

**Problem**: TopFlow uses old version after update
```
Still seeing old behavior after pnpm update
```

**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

### Linking Issues

**Problem**: `pnpm link` not working
```
Module not found: Can't resolve '@charliesu/workflow-core'
```

**Solution**: Rebuild workflow-core and re-link:
```bash
# In workflow-core
cd /home/ubuntu/Projects/school/workflow-core
pnpm build
pnpm link --global

# In TopFlow
cd /home/ubuntu/Projects/school/topflow
pnpm unlink @charliesu/workflow-core
pnpm link --global @charliesu/workflow-core
pnpm dev
```

---

### Vercel Deployment Issues

**Problem**: Build fails on Vercel with local dependency
```
Error: Cannot find module '@charliesu/workflow-core'
```

**Solution**: Always use npm published version for deployment:
```json
// ✅ Good (works on Vercel)
"@charliesu/workflow-core": "^0.0.1-alpha"

// ❌ Bad (fails on Vercel)
"@charliesu/workflow-core": "file:../workflow-core"
```

---

## Quick Reference

### Common Commands

```bash
# Development
pnpm install          # Install dependencies
pnpm build            # Build package
pnpm link --global    # Link for local development

# Publishing
npm version <type>    # Bump version
npm publish           # Publish to npm
git push --tags       # Push version tags

# In consuming apps
pnpm add @charliesu/workflow-core           # Install
pnpm update @charliesu/workflow-core        # Update
pnpm link --global @charliesu/workflow-core # Use local version
```

### Version Bump Examples

```bash
npm version 0.0.1-alpha    # Alpha release
npm version 0.1.0-beta     # Beta release
npm version patch          # 1.0.0 → 1.0.1
npm version minor          # 1.0.1 → 1.1.0
npm version major          # 1.1.0 → 2.0.0
```

---

## Contributing

We welcome contributions! Before starting:

1. Check existing issues and pull requests
2. Open an issue to discuss major changes
3. Follow the development workflow in this guide
4. Ensure all tests pass and builds succeed
5. Update documentation for public API changes

**Questions?** Open an issue on GitHub or reach out to the maintainers.

---

## Resources

- [npm Package](https://www.npmjs.com/package/@charliesu/workflow-core)
- [GitHub Repository](https://github.com/charliesu/workflow-core)
- [Semantic Versioning](https://semver.org/)
- [pnpm Documentation](https://pnpm.io/)
- [React Flow Documentation](https://reactflow.dev/)
- [Vercel AI SDK](https://sdk.vercel.ai/)

---

**Last Updated**: January 2026
**Package Version**: 0.0.1-alpha
**Maintainer**: Charlie Su (@charliesu)
