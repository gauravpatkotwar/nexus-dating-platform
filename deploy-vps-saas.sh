#!/usr/bin/env bash
set -e

echo "========================================================"
echo "🚀 DEPLOYING FULL PRODUCTION SAAS PLATFORM ON VPS"
echo "🌐 Domain: https://hook.nexus.com"
echo "========================================================"

# 1. Update System & Install Core Tools
sudo apt-get update -y
sudo apt-get install -y curl git build-essential ufw certbot

# 2. Install Node.js 20 & PM2 Process Manager
if ! command -v node &> /dev/null; then
  echo "⚡ Installing Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo npm install -g pm2

# 3. Install & Configure PostgreSQL Database
sudo apt-get install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 4. Open Essential Ports on UFW Firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 53/udp
sudo ufw allow 53/tcp
sudo ufw allow 22/tcp
sudo ufw --force enable

# 5. Install Backend Dependencies & Build Production SaaS Core
echo "⚡ Building Backend SaaS Services..."
cd /home/ubuntu/nexus/backend || cd ~/nexus/backend
npm install
npm run build

# 6. Install Frontend Dependencies & Build Production UI
echo "⚡ Building Frontend SaaS UI..."
cd /home/ubuntu/nexus/frontend || cd ~/nexus/frontend
npm install
npm run build

# 7. Start Microservices with PM2 Daemon
echo "🚀 Launching SaaS Daemons..."
cd /home/ubuntu/nexus || cd ~/nexus

pm2 stop all || true
pm2 start domain-engine/public-dns-server.js --name "nexus-dns" --interpreter sudo
pm2 start domain-engine/native-core-gateway.js --name "nexus-gateway" --interpreter sudo
pm2 start "npm --prefix backend run start:prod" --name "nexus-backend"
pm2 start "npm --prefix frontend run start" --name "nexus-frontend"

pm2 save
pm2 startup || true

echo "========================================================"
echo "🎉 FULL SAAS PLATFORM DEPLOYED & LIVE 24/7/365!"
echo "🌐 Dedicated SaaS Domain: https://hook.nexus.com"
echo "========================================================"
