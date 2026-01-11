# Test Coverage Guide

Complete guide for understanding and working with test coverage in TopFlow.

## Overview

TopFlow uses Jest for test coverage tracking with the following thresholds:

| Metric | Threshold |
|--------|-----------|
| Statements | 75% |
| Branches | 70% |
| Functions | 75% |
| Lines | 75% |

## Running Coverage Reports

### Local Development

**Generate coverage report:**
```bash
pnpm test:coverage
```

This will:
1. Run all tests
2. Generate coverage data
3. Create reports in multiple formats
4. Display summary in terminal

**View HTML coverage report:**
```bash
# After running pnpm test:coverage
open coverage/lcov-report/index.html

# Or on Linux
xdg-open coverage/lcov-report/index.html
```

### CI/CD Pipeline

Coverage reports are automatically generated on every:
- Pull request
- Push to main/master branch
- Manual workflow dispatch

**Viewing CI coverage:**
1. Go to GitHub Actions tab
2. Click on the workflow run
3. Download "coverage-report" artifact
4. Extract and open `index.html`

## Coverage Report Types

### 1. Text Summary (Console)

Displayed after running tests:
```
=============================== Coverage summary ===============================
Statements   : 78.5% ( 1234/1572 )
Branches     : 72.3% ( 456/631 )
Functions    : 80.1% ( 234/292 )
Lines        : 78.2% ( 1211/1549 )
================================================================================
```

### 2. HTML Report (Local Viewing)

**Location**: `coverage/lcov-report/index.html`

Features:
- Interactive file browser
- Color-coded coverage (red = uncovered, yellow = partial, green = covered)
- Line-by-line coverage visualization
- Branch coverage details

**Best for**: Local development and detailed investigation

### 3. LCOV Report (CI Tools)

**Location**: `coverage/lcov.info`

Used by:
- GitHub Actions
- Code coverage tools (Codecov, Coveralls)
- IDE integrations

**Best for**: Automated tooling and integrations

### 4. JSON Summary (Badges/Tools)

**Location**: `coverage/coverage-summary.json`

Structure:
```json
{
  "total": {
    "lines": { "total": 1549, "covered": 1211, "pct": 78.18 },
    "statements": { "total": 1572, "covered": 1234, "pct": 78.50 },
    "functions": { "total": 292, "covered": 234, "pct": 80.14 },
    "branches": { "total": 631, "covered": 456, "pct": 72.30 }
  }
}
```

**Best for**: Badge generation and custom tooling

## Understanding Coverage Metrics

### Statements Coverage

**What it measures**: Percentage of code statements executed

**Example**:
```typescript
function add(a: number, b: number) {
  const result = a + b  // Statement 1
  return result         // Statement 2
}

// Test covers both statements = 100% statement coverage
test('adds numbers', () => {
  expect(add(2, 3)).toBe(5)
})
```

### Branch Coverage

**What it measures**: Percentage of conditional branches executed

**Example**:
```typescript
function isPositive(num: number) {
  if (num > 0) {        // Branch 1: true
    return true
  } else {              // Branch 2: false
    return false
  }
}

// Need tests for BOTH branches = 100% branch coverage
test('positive number', () => {
  expect(isPositive(5)).toBe(true)   // Covers Branch 1
})

test('negative number', () => {
  expect(isPositive(-5)).toBe(false) // Covers Branch 2
})
```

### Function Coverage

**What it measures**: Percentage of functions called

**Example**:
```typescript
export function add(a: number, b: number) {
  return a + b
}

export function subtract(a: number, b: number) {
  return a - b  // Not tested = 0% function coverage for this function
}

// Only tests add() = 50% function coverage
test('addition', () => {
  expect(add(2, 3)).toBe(5)
})
```

### Line Coverage

**What it measures**: Percentage of lines executed

**Example**:
```typescript
function processData(data: string) {
  const trimmed = data.trim()      // Line 1: Covered
  const upper = trimmed.toUpperCase()  // Line 2: Covered
  const parts = upper.split(',')   // Line 3: Not covered (test doesn't reach here)
  return parts
}

// Test only covers lines 1-2 = 66% line coverage
test('processes data', () => {
  processData('  hello  ')
})
```

## Coverage Thresholds

### Why These Thresholds?

**75% for statements/functions/lines:**
- Industry standard for good coverage
- Balances thoroughness with practicality
- Catches most critical bugs
- Doesn't require testing trivial code

**70% for branches:**
- Branch coverage is harder to achieve
- Some defensive branches may be difficult to test
- Still catches most conditional logic issues

### When Thresholds Fail

**Build will fail if coverage drops below thresholds:**
```
FAIL  Coverage for statements (72%) does not meet threshold (75%)
FAIL  Coverage for branches (65%) does not meet threshold (70%)
```

**How to fix:**
1. Add tests for uncovered code
2. Remove dead code that's not tested
3. Refactor to make code more testable
4. If necessary, adjust thresholds (requires discussion)

## Improving Coverage

### Identify Uncovered Code

**Using HTML report:**
1. Run `pnpm test:coverage`
2. Open `coverage/lcov-report/index.html`
3. Navigate to files with low coverage
4. Red lines = not covered
5. Yellow lines = partially covered (e.g., only one branch tested)

**Using console output:**
```bash
pnpm test:coverage -- --verbose

# Shows uncovered lines:
# File: lib/validation.ts
# Uncovered Lines: 45-48, 67, 89-92
```

### Write Targeted Tests

**For uncovered statements:**
```typescript
// Uncovered code:
function calculateDiscount(price: number, isVIP: boolean) {
  let discount = 0
  if (isVIP) {
    discount = price * 0.2  // This line not covered
  }
  return price - discount
}

// Add test:
test('VIP discount', () => {
  expect(calculateDiscount(100, true)).toBe(80)
})
```

**For uncovered branches:**
```typescript
// Only true branch tested:
function validateAge(age: number) {
  if (age < 0) {
    throw new Error('Invalid age')  // True branch
  }
  return true  // False branch not covered
}

// Add test for false branch:
test('valid age', () => {
  expect(validateAge(25)).toBe(true)  // Covers false branch
})
```

### Coverage Best Practices

1. **Test critical paths first**:
   - Workflow execution logic
   - Security validation (SSRF, XSS prevention)
   - Data transformation
   - API integrations

2. **Don't chase 100% coverage**:
   - Some defensive code may be hard to test
   - Focus on business logic, not trivial code
   - 75% is a good balance

3. **Use coverage to find gaps, not as a goal**:
   - Coverage shows what's tested, not if it's tested well
   - Write meaningful assertions
   - Test edge cases and error conditions

4. **Exclude generated code**:
   ```javascript
   // In jest.config.js
   collectCoverageFrom: [
     '!**/*.d.ts',        // Type definitions
     '!**/node_modules/**',  // Dependencies
     '!**/.next/**',      // Next.js build output
   ]
   ```

## Coverage in CI/CD

### GitHub Actions Integration

**When coverage runs:**
- On every pull request
- On pushes to main/master
- Manually via workflow dispatch

**Workflow configuration** (`.github/workflows/ci.yml`):
```yaml
- name: Run tests
  run: pnpm test

- name: Generate coverage report
  run: pnpm test:coverage
  continue-on-error: true

- name: Upload coverage to artifacts
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: coverage-report
    path: coverage/
```

### Coverage Artifacts

**Downloading from GitHub:**
1. Go to Actions tab
2. Click on workflow run
3. Scroll to "Artifacts" section
4. Download "coverage-report"
5. Extract ZIP and open `lcov-report/index.html`

**Retention**: 30 days (configurable in workflow)

## Troubleshooting

### Coverage Report Not Generating

**Symptom**: No coverage directory after running tests

**Solution**:
```bash
# Clean and regenerate
rm -rf coverage/
pnpm test:coverage
```

### Coverage Threshold Failing Unexpectedly

**Symptom**: Tests pass locally but fail in CI

**Causes**:
- Different test files running in CI
- Cached coverage data
- Environment differences

**Solution**:
```bash
# Clear cache and rebuild
pnpm test:coverage --clearCache
```

### HTML Report Not Opening

**Symptom**: Browser shows 404 or doesn't open

**Solution**:
```bash
# Verify report exists
ls -la coverage/lcov-report/index.html

# Generate fresh report
pnpm test:coverage

# Open with full path
open "$(pwd)/coverage/lcov-report/index.html"
```

### Coverage Dropping After Adding Tests

**Symptom**: Coverage percentage decreases after adding new code

**Explanation**:
- Coverage is a percentage
- Adding new code increases denominator
- Need to test new code to maintain percentage

**Solution**:
Write tests for newly added code.

## Advanced Usage

### Coverage for Specific Files

```bash
# Test only specific directory
pnpm test components/ --coverage

# Test specific file pattern
pnpm test --testPathPattern=validation --coverage
```

### Watch Mode with Coverage

```bash
# Update coverage on every test run
pnpm test:watch --coverage --watchAll=false
```

### Exclude Files from Coverage

**In jest.config.js:**
```javascript
collectCoverageFrom: [
  'lib/**/*.{ts,tsx}',
  '!lib/legacy/**',  // Exclude legacy code
  '!lib/**/*.stories.tsx',  // Exclude Storybook stories
]
```

## Resources

- [Jest Coverage Documentation](https://jestjs.io/docs/configuration#collectcoveragefrom-array)
- [Istanbul Coverage Tools](https://istanbul.js.org/)
- [Testing Best Practices](https://testingjavascript.com/)

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm test:coverage` | Generate full coverage report |
| `pnpm test:ci` | Run tests with coverage in CI mode |
| `open coverage/lcov-report/index.html` | View HTML report |
| `pnpm test --coverage --watch` | Watch mode with coverage |

---

**Coverage Target**: 75% statements/functions/lines, 70% branches
**Current Status**: See latest CI run or run `pnpm test:coverage`
**Last Updated**: January 2026
**Maintainer**: Charlie Su (@charliesu)
