#!/usr/bin/env bash
# ==============================================================================
# MASTER SELF-HOSTED DOMAIN ENGINE & SAAS LAUNCHER
# Target Domain: https://hook.nexus.com
# Ports: 53 (DNS), 80 (HTTP), 443 (HTTPS), 3000 (Frontend), 4000 (Backend)
# ==============================================================================

set -e

echo "🚀 Starting Master Self-Hosted Domain Engine & SaaS Platform..."
echo "🌐 Dedicated Domain: https://hook.nexus.com"

# 1. Stop existing process instances
echo "🧹 Cleaning previous gateway processes..."
echo "4267284" | sudo -S pkill -f "native-core-gateway.js" || true
echo "4267284" | sudo -S pkill -f "public-dns-server.js" || true

# 2. Build NestJS Backend Core
echo "⚡ Building NestJS Backend Core..."
cd backend
npm install
npm run build
cd ..

# 3. Build Next.js Frontend App
echo "🎨 Building Next.js Frontend App..."
cd frontend
npm install
npm run build
cd ..

# 4. Start Background Services
echo "🚀 Launching Production Services..."
nohup npm --prefix backend run start:prod > backend.log 2>&1 &
nohup npm --prefix frontend run start -- -p 3000 > frontend.log 2>&1 &

sleep 3

# 5. Start Native Authoritative DNS Server (Port 53)
echo "📡 Launching Native Authoritative DNS Server on Port 53..."
echo "4267284" | sudo -S node domain-engine/public-dns-server.js &

# 6. Start Native HTTPS Gateway (Ports 80 & 443)
echo "🔒 Launching Native HTTPS Gateway on Ports 80 & 443..."
echo "4267284" | sudo -S node domain-engine/native-core-gateway.js &

sleep 2

echo ""
echo "============================================================="
echo "🎉 MASTER SELF-HOSTED PLATFORM IS LIVE & RUNNING!"
echo "🌐 Dedicated Domain: https://hook.nexus.com"
echo "📡 Native DNS Server: UDP Port 53 (0.0.0.0)"
echo "🔒 Native HTTPS Core Gateway: TCP Ports 80 & 443"
echo "============================================================="
