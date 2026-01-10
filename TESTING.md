# Testing Documentation

![Test Status](https://img.shields.io/badge/tests-59%20passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25%20(tested%20modules)-brightgreen)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## Overview

TopFlow follows Test-Driven Development (TDD) principles to ensure code quality, maintainability, and reliability. We maintain comprehensive test coverage for all critical business logic.

## Quick Start

```bash
# Run all tests
pnpm test

# Run tests in watch mode (for development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci
```

## Test Statistics

| Metric | Value |
|--------|-------|
| **Total Test Suites** | 3 |
| **Total Tests** | 59 passing |
| **Test Speed** | ~0.9s |
| **Critical Modules Covered** | 3/3 (100%) |
| **Build Status** | ✅ Passing |

### Coverage by Module

| Module | Statements | Branches | Functions | Lines | Tests |
|--------|-----------|----------|-----------|-------|-------|
| **lib/utils.ts** | 100% | 100% | 100% | 100% | 6 |
| **lib/storage.ts** | 95.23% | 83.33% | 100% | 93.93% | 21 |
| **lib/workflow-store.ts** | 95% | 80% | 100% | 94.44% | 32 |

## Test Architecture

### Test Pyramid

```
         /\
        /E2E\       ← Few - Critical user flows
       /------\
      /  Integ \    ← Some - Component + API integration
     /----------\
    /   Unit     \  ← Many - Business logic, utilities, stores
   /--------------\
```

**Current Distribution:**
- 100% Unit Tests (59 tests)
- 0% Integration Tests (coming soon)
- 0% E2E Tests (planned)

### Testing Stack

- **Jest** 30.2.0 - Test runner and assertion library
- **React Testing Library** 16.3.1 - Component testing
- **MSW** 2.12.7 - API mocking at network level
- **Testing Library User Event** 14.6.1 - User interaction simulation
- **Vitest** 4.0.16 - Alternative test runner with UI

## Test Suites

### 1. Utils Tests (`lib/__tests__/utils.test.ts`)

**Purpose**: Test utility functions for className merging

**Coverage**: 100% (6/6 tests passing)

**Tests:**
- ✅ Class name merging
- ✅ Conditional class handling
- ✅ Array input support
- ✅ Tailwind class deduplication
- ✅ Null/undefined handling
- ✅ Empty input handling

```bash
pnpm jest utils.test.ts
```

---

### 2. Storage Tests (`lib/__tests__/storage.test.ts`)

**Purpose**: Test localStorage abstraction layer for workflow persistence

**Coverage**: 95.23% statements (21/21 tests passing)

**Test Categories:**

**Workflow Management:**
- ✅ Save new workflows
- ✅ Update existing workflows (with timestamp)
- ✅ Retrieve workflows by ID
- ✅ List all workflows
- ✅ Delete workflows (with cascading version deletion)
- ✅ SSR safety (window undefined check)

**Version Control:**
- ✅ Save workflow versions
- ✅ Retrieve versions by workflow ID
- ✅ Sort versions (descending)
- ✅ Delete specific versions
- ✅ Version isolation

**Templates:**
- ✅ Include default templates
- ✅ Include public user workflows
- ✅ Exclude private workflows
- ✅ Security template integration

```bash
pnpm jest storage.test.ts
```

---

### 3. Workflow Store Tests (`lib/__tests__/workflow-store.test.ts`)

**Purpose**: Test Zustand state management for undo/redo and workflow state

**Coverage**: 95% statements (32/32 tests passing)

**Test Categories:**

**State Management:**
- ✅ Initial state verification
- ✅ Node updates
- ✅ Edge updates
- ✅ Deep copy verification

**History & Undo/Redo:**
- ✅ History entry creation
- ✅ Undo functionality
- ✅ Redo functionality
- ✅ canUndo/canRedo guards
- ✅ History limit (50 entries max)
- ✅ History branching (future history removal)
- ✅ History clearing

**Save Status:**
- ✅ Save status updates
- ✅ Timestamp tracking
- ✅ Idle state on changes

```bash
pnpm jest workflow-store.test.ts
```

---

## Running Tests

### Development Workflow

**TDD Cycle (Red-Green-Refactor):**

```bash
# 1. Start watch mode
pnpm test:watch

# 2. Write failing test (RED)
# 3. Implement code to pass (GREEN)
# 4. Refactor while keeping tests green (REFACTOR)
```

### CI/CD Integration

Tests run automatically on:
- Every push to `main` or `develop`
- All pull requests
- Pre-deployment verification

**CI Command:**
```bash
pnpm test:ci
```

This runs tests with:
- `--ci` flag (optimized for CI)
- `--coverage` (generates coverage reports)
- `--maxWorkers=2` (limits parallel execution)

### Coverage Reports

**Generate HTML coverage report:**
```bash
pnpm test:coverage
open coverage/lcov-report/index.html
```

**View in terminal:**
```bash
pnpm jest --coverage --coverageReporters=text
```

---

## Writing Tests

### File Structure

```
lib/
├── storage.ts
└── __tests__/
    └── storage.test.ts

components/
├── button.tsx
└── button.test.tsx
```

### Test Template

```typescript
import { functionToTest } from '../module'

describe('functionToTest', () => {
  beforeEach(() => {
    // Setup before each test
  })

  it('should do something specific', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = functionToTest(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

### Best Practices

✅ **DO:**
- Test behavior, not implementation
- Use descriptive test names
- Keep tests independent
- Follow AAA pattern (Arrange-Act-Assert)
- Test edge cases
- Use accessible queries (getByRole, getByLabel)

❌ **DON'T:**
- Test implementation details
- Create interdependent tests
- Use data-testid excessively
- Skip edge case testing
- Mock what you don't own

See [docs/development/testing-guide.md](docs/development/testing-guide.md) for detailed guidelines.

---

## Coverage Goals

### Current Coverage (Tested Modules)

| Category | Target | Current (Tested) |
|----------|--------|------------------|
| Utilities | 95% | ✅ 100% |
| Business Logic | 90% | ✅ 95.23% |
| State Management | 90% | ✅ 95% |

### Overall Project Coverage

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Statements | 75% | 2.03% | 🟡 In Progress |
| Branches | 70% | 0.83% | 🟡 In Progress |
| Functions | 75% | 2.85% | 🟡 In Progress |
| Lines | 75% | 1.86% | 🟡 In Progress |

**Note**: Low overall coverage is expected at this stage. We're following TDD principles by testing critical business logic first. UI components and integration tests are planned for future iterations.

### Coverage Roadmap

- ✅ **Phase 1**: Core utilities and business logic (Current)
- 🟡 **Phase 2**: Hooks and custom React hooks
- 📋 **Phase 3**: Component tests (React Testing Library)
- 📋 **Phase 4**: Integration tests (API + Components)
- 📋 **Phase 5**: E2E tests (Playwright)

---

## Continuous Integration

### GitHub Actions Workflow

Tests run automatically on every:
- Push to `main` or `develop` branches
- Pull request creation/update
- Pre-deployment hooks

**Workflow file**: `.github/workflows/test.yml` (coming soon)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test:ci
      - run: pnpm build
```

---

## Troubleshooting

### Common Issues

**Issue**: Tests failing with "Cannot find module"

**Solution**: Check module path aliases in `jest.config.js`:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
},
```

---

**Issue**: "TextEncoder is not defined"

**Solution**: Already fixed in `jest.setup.js` with polyfills.

---

**Issue**: Tests pass locally but fail in CI

**Solution**: Ensure tests don't depend on:
- Local environment variables
- System time/timezone
- File system paths
- Random data (use seeds)

---

## Performance Benchmarks

| Operation | Time | Threshold |
|-----------|------|-----------|
| Full test suite | ~0.9s | < 2s |
| Single test file | ~0.7s | < 1s |
| Coverage generation | ~6s | < 10s |
| Build verification | ~8.3s | < 30s |

---

## Contributing

### Before Submitting PRs

1. ✅ All tests must pass: `pnpm test`
2. ✅ Build must succeed: `pnpm build`
3. ✅ Lint must pass: `pnpm lint`
4. ✅ New features require tests
5. ✅ Coverage should not decrease

### Writing New Tests

1. Read [Testing Guide](docs/development/testing-guide.md)
2. Follow existing test patterns
3. Ensure tests are isolated
4. Add edge case coverage
5. Update this documentation if needed

---

## Resources

### Documentation
- [Testing Guide](docs/development/testing-guide.md) - Comprehensive testing guide
- [TDD Strategy](docs/reference/tdd_guideline/tdd-strategy-frontend.md) - TDD methodology
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

### External Resources
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [MSW Documentation](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Test Results Archive

### Latest Run

**Date**: January 10, 2026
**Commit**: Latest
**Status**: ✅ All tests passing

```
Test Suites: 3 passed, 3 total
Tests:       59 passed, 59 total
Snapshots:   0 total
Time:        0.943 s
```

**Build Status**: ✅ Passing (8.3s)
- 32 routes generated
- Bundle size: 102 KB (shared chunks)
- No errors or warnings

---

## License

Tests are part of TopFlow and follow the same license as the main project.

---

**Questions or issues?** Please open an issue on GitHub or check the [Testing Guide](docs/development/testing-guide.md).
