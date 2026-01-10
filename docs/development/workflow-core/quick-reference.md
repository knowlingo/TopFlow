# Workflow-Core Quick Reference

Quick commands for common workflow-core development tasks.

## 🚀 Quick Start

```bash
# Clone and setup
cd /home/ubuntu/Projects/school
git clone https://github.com/charliesu/workflow-core.git
cd workflow-core
pnpm install
pnpm build
```

## 📦 Local Development

### Link for Development

```bash
# In workflow-core
cd /home/ubuntu/Projects/school/workflow-core
pnpm link --global

# In TopFlow
cd /home/ubuntu/Projects/school/topflow
pnpm link --global @charliesu/workflow-core
pnpm dev
```

### Rebuild After Changes

```bash
# In workflow-core
pnpm build

# TopFlow automatically picks up changes (if linked)
```

### Unlink

```bash
# In TopFlow
cd /home/ubuntu/Projects/school/topflow
pnpm unlink @charliesu/workflow-core
pnpm install  # Reinstall from npm

# In workflow-core (cleanup)
cd /home/ubuntu/Projects/school/workflow-core
pnpm unlink --global
```

## 🚢 Publishing

### Quick Publish (Alpha)

```bash
cd /home/ubuntu/Projects/school/workflow-core

# Make sure everything is committed
git add .
git commit -m "feat: your changes"

# Bump version and publish
npm version 0.0.X-alpha  # Increment X
npm publish

# Push to git
git push
git push --tags
```

### Stable Release

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm version patch

# For new features (1.0.1 → 1.1.0)
npm version minor

# For breaking changes (1.1.0 → 2.0.0)
npm version major

# Publish
npm publish --access public
git push --tags
```

## 📥 Using in Applications

### Install in TopFlow

```bash
cd /home/ubuntu/Projects/school/topflow

# Install latest
pnpm add @charliesu/workflow-core@latest

# Install specific version
pnpm add @charliesu/workflow-core@0.0.5-alpha

# Update to latest
pnpm update @charliesu/workflow-core
```

### Usage in Code

```typescript
import {
  TopFlowExecutionEngine,
  validateWorkflow,
  type WorkflowNode,
  type WorkflowEdge
} from '@charliesu/workflow-core'

// Validate workflow
const validation = validateWorkflow(nodes, edges, apiKeys)

// Execute workflow
const engine = new TopFlowExecutionEngine()
const result = await engine.execute(nodes, edges, apiKeys)
```

## 🐛 Troubleshooting

### Clear Cache

```bash
# In TopFlow
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Verify Package Version

```bash
# Check installed version
pnpm list @charliesu/workflow-core

# Check latest on npm
npm view @charliesu/workflow-core versions
```

### Build Errors

```bash
# In workflow-core
rm -rf dist node_modules
pnpm install
pnpm build
```

## 📋 Common Tasks

| Task | Command |
|------|---------|
| Build package | `pnpm build` |
| Link locally | `pnpm link --global` |
| Unlink | `pnpm unlink --global` |
| Bump alpha | `npm version 0.0.X-alpha` |
| Bump patch | `npm version patch` |
| Publish | `npm publish` |
| Install in app | `pnpm add @charliesu/workflow-core` |
| Update in app | `pnpm update @charliesu/workflow-core` |

## 🔍 Package Info

```bash
# View package info on npm
npm view @charliesu/workflow-core

# View all versions
npm view @charliesu/workflow-core versions

# Check who's logged in
npm whoami

# Login to npm
npm login
```

## 📝 Version Strategy

| Stage | Version | When to Use |
|-------|---------|-------------|
| Alpha | 0.0.x-alpha | Active development, API unstable |
| Beta | 0.x.0-beta | Feature complete, testing |
| RC | 1.0.0-rc.x | Final testing before stable |
| Stable | 1.0.0+ | Production ready |

## ⚙️ package.json Config

### For Production (TopFlow deployed)

```json
{
  "dependencies": {
    "@charliesu/workflow-core": "^0.0.1-alpha"
  }
}
```

### For Local Development Only

```json
{
  "dependencies": {
    "@charliesu/workflow-core": "file:../workflow-core"
  }
}
```

⚠️ **Warning**: File dependencies don't work on Vercel!

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@charliesu/workflow-core)
- [Full Guide](./README.md)
- [GitHub Issues](https://github.com/charliesu/workflow-core/issues)

---

**Need more details?** See the [complete guide](./README.md).
