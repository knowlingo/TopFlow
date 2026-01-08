#!/bin/bash
# Git Sync Verification Script
# Verifies which documentation will be public vs private

echo "=================================================="
echo "  Git Sync Strategy Verification"
echo "  TopFlow (topflow.dev)"
echo "=================================================="
echo ""

echo "✅ PUBLIC Documentation (will sync to GitHub):"
echo "------------------------------------------------"
echo "📄 Main README and documentation hub:"
find docs -maxdepth 1 -name "*.md" -type f 2>/dev/null | sort | sed 's/^/  ✓ /'
echo ""
echo "🏗️  Architecture (technical showcase):"
find docs/architecture -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✓ /'
echo ""
echo "📚 Guides (user documentation):"
find docs/guides -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✓ /'
echo ""
echo "🛠️  Development (roadmap & contribution):"
find docs/development -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✓ /'
echo ""

echo "🔒 PRIVATE Documentation (local only, NOT synced):"
echo "------------------------------------------------"
if [ -d "docs/notes" ]; then
    echo "📝 Notes (working documents):"
    find docs/notes -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✗ /'
    echo ""
fi

if [ -d "docs/reference" ]; then
    echo "📊 Reference (analysis documents):"
    find docs/reference -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✗ /'
    echo ""
fi

if [ -d "docs/repositioning-proposal" ]; then
    echo "🎯 Repositioning Proposal (career strategy):"
    find docs/repositioning-proposal -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✗ /'
    echo ""
fi

if [ -d "docs/v0-documentation" ]; then
    echo "📋 V0 Documentation (phase tracking):"
    find docs/v0-documentation -type f -name "*.md" 2>/dev/null | sort | sed 's/^/  ✗ /'
    echo ""
fi

echo "=================================================="
echo "📋 Summary"
echo "=================================================="
PUBLIC_COUNT=$(find docs/architecture docs/guides docs/development docs/*.md -type f 2>/dev/null | wc -l)
PRIVATE_COUNT=$(find docs/notes docs/reference docs/repositioning-proposal docs/v0-documentation -type f 2>/dev/null | wc -l)

echo "✅ Public docs: $PUBLIC_COUNT files"
echo "🔒 Private docs: $PRIVATE_COUNT files"
echo ""

echo "=================================================="
echo "🔍 Gitignore Check"
echo "=================================================="
if grep -q "/docs/notes" .gitignore && \
   grep -q "/docs/reference" .gitignore && \
   grep -q "/docs/repositioning-proposal" .gitignore && \
   grep -q "/docs/v0-documentation" .gitignore; then
    echo "✅ .gitignore is correctly configured"
    echo ""
    echo "Private folders in .gitignore:"
    grep "^/docs/" .gitignore | sed 's/^/  ✓ /'
else
    echo "❌ .gitignore may be missing some entries"
    echo "Expected entries:"
    echo "  /docs/notes"
    echo "  /docs/reference"
    echo "  /docs/repositioning-proposal"
    echo "  /docs/v0-documentation"
fi
echo ""

echo "=================================================="
echo "🚀 Next Steps"
echo "=================================================="
echo ""
echo "Before pushing to GitHub:"
echo "  1. Review public documentation for quality"
echo "  2. Ensure no TODOs or placeholders in public docs"
echo "  3. Verify all links work (topflow.dev, charliesu.com)"
echo "  4. Check consistent branding throughout"
echo ""
echo "To initialize git:"
echo "  git init"
echo "  git add ."
echo "  git status  # Review what will be committed"
echo "  git commit -m 'Initial commit: TopFlow - Secure AI Agent Orchestration'"
echo ""
echo "See docs/GIT_SYNC_STRATEGY.md for full details"
echo "=================================================="
