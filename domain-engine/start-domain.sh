#!/bin/bash

# ==============================================================================
#  CUSTOM DOMAIN ENGINE LAUNCHER (Built from scratch)
#  Target Domain: date.pulse.com
# ==============================================================================

set -e

DOMAIN="date.pulse.com"

echo "======================================================================"
echo "⚡ LAUNCHING CUSTOM DOMAIN ENGINE BUILT FROM SCRATCH: $DOMAIN"
echo "======================================================================"

# 1. Bind date.pulse.com in /etc/hosts if needed
if grep -q "$DOMAIN" /etc/hosts; then
    echo "[✓] $DOMAIN is already mapped in /etc/hosts"
else
    echo "[i] Mapping $DOMAIN to 127.0.0.1 in /etc/hosts..."
    echo "127.0.0.1   $DOMAIN" | sudo tee -a /etc/hosts
    echo "[✓] Mapped $DOMAIN!"
fi

echo ""
echo "======================================================================"
echo "🚀 Starting Domain DNS Engine & HTTP Gateway Server..."
echo "======================================================================"

# Launch DNS Engine in background if running as root
if [ "$EUID" -eq 0 ]; then
    node domain-engine/dns-server.js &
    node domain-engine/http-gateway.js
else
    PORT=8080 node domain-engine/http-gateway.js
fi
