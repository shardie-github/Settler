#!/bin/bash
# Branch Cleanup Script
# This script helps clean up stale branches in the repository

set -e

echo "🔍 Analyzing branches..."

# Show all remote branches
echo ""
echo "Remote branches:"
git branch -r | grep -E "cursor/" | head -20

echo ""
echo "⚠️  WARNING: This script will help you identify branches to delete."
echo "Review the branches above and delete manually with:"
echo ""
echo "  # Delete remote branch:"
echo "  git push origin --delete branch-name"
echo ""
echo "  # Delete local branch:"
echo "  git branch -d branch-name"
echo ""
echo "  # Force delete local branch (if not merged):"
echo "  git branch -D branch-name"
echo ""

# Check which remote branches have been merged
echo "📊 Checking merged branches..."
echo ""
echo "Remote branches that appear to be merged (review carefully):"
git branch -r --merged origin/main | grep -E "cursor/" || echo "  (none found)"

echo ""
echo "Remote branches NOT merged (may still be in use):"
git branch -r --no-merged origin/main | grep -E "cursor/" || echo "  (none found)"

echo ""
echo "✅ Analysis complete. Review and delete branches manually as needed."
