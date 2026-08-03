#!/bin/bash

# ==============================================================================
#  SELF-HOSTED PLATFORM HEALTHCHECK MONITOR
# ==============================================================================

echo "========================================="
echo "  Self-Hosted System Health Diagnostic"
echo "========================================="

# 1. Check Docker status
if command -v docker >/dev/null 2>&1; then
    echo "✓ Docker Installed: $(docker --version)"
else
    echo "❌ Docker Not Installed"
fi

# 2. Check Gateway Nginx container
if docker ps | grep -q "nexus-gateway"; then
    echo "✓ Nginx Gateway: ACTIVE & RUNNING"
else
    echo "⚠️ Nginx Gateway: NOT RUNNING"
fi

# 3. Check Backend container
if docker ps | grep -q "nexus-backend"; then
    echo "✓ NestJS Backend: ACTIVE & RUNNING"
else
    echo "⚠️ NestJS Backend: NOT RUNNING"
fi

# 4. Check Frontend container
if docker ps | grep -q "nexus-frontend"; then
    echo "✓ Next.js Frontend: ACTIVE & RUNNING"
else
    echo "⚠️ Next.js Frontend: NOT RUNNING"
fi

# 5. Check Database container
if docker ps | grep -q "nexus-postgres"; then
    echo "✓ PostgreSQL Database: ACTIVE & RUNNING"
else
    echo "⚠️ PostgreSQL Database: NOT RUNNING"
fi

echo "========================================="
