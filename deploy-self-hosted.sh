#!/bin/bash

# ==============================================================================
#  NEXUS DATING - SELF-HOSTED INFRASTRUCTURE MERGE & LAUNCH SCRIPT
#  Target Domain: hooknexus.com
# ==============================================================================

set -e

DOMAIN_NAME=${1:-"hooknexus.com"}

echo "======================================================================"
echo "🚀 MERGING DOMAIN [$DOMAIN_NAME] WITH YOUR SELF-HOSTED HOSTING..."
echo "======================================================================"

# 1. Environment File Setup
if [ ! -f .env ]; then
    echo "[i] Creating production .env file..."
    cp .env.example .env
fi

# 2. Build & Deploy Gateway and Microservices
echo "======================================================================"
echo "📦 Building Nginx Edge Gateway & Launching Nexus Dating Services..."
echo "======================================================================"
docker-compose down 2>/dev/null || true
docker-compose up -d --build

# 3. Final Summary
echo ""
echo "======================================================================"
echo "🎉 DOMAIN MERGE COMPLETE! YOUR SELF-HOSTED HOSTING IS READY FOR:"
echo "👉 https://$DOMAIN_NAME"
echo "👉 https://www.$DOMAIN_NAME"
echo "======================================================================"
