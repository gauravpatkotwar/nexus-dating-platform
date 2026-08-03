/**
 * CUSTOM MULTI-DEVICE SECURE DOMAIN ENGINE (Built from scratch)
 * Domain Target: https://date.pulse.com & All Local Network Devices
 * 
 * Features:
 *  - Multi-Device Binding (0.0.0.0 - Accessible on Wi-Fi & Internet)
 *  - Native SSL/TLS Encryption
 *  - HSTS & Security Shield Headers
 *  - Secure WebSockets Support (wss://)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const TARGET_DOMAIN = 'date.pulse.com';
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
const HTTP_PORT = process.env.HTTP_PORT || 8080;

// Load SSL/TLS Credentials
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

// 1. Create Secure HTTPS Gateway Server listening on 0.0.0.0 (All Devices)
const server = https.createServer(options, (req, res) => {
  const hostHeader = (req.headers.host || '').split(':')[0];
  const isApi = req.url.startsWith('/api') || req.url.startsWith('/socket.io');
  const targetPort = isApi ? BACKEND_PORT : FRONTEND_PORT;

  const proxyOptions = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `127.0.0.1:${targetPort}`,
      'x-forwarded-host': hostHeader || TARGET_DOMAIN,
      'x-forwarded-proto': 'https',
      'x-forwarded-for': req.socket.remoteAddress,
      'x-multi-device-engine': 'active-all-interfaces',
    },
  };

  const proxyReq = http.request(proxyOptions, (proxyRes) => {
    // Add Security & Cross-Device Access Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Secure-Domain-Engine', 'date.pulse.com-MultiDevice-HTTPS');

    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>🔒 ${TARGET_DOMAIN} - Multi-Device Secure Engine</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #111827; padding: 40px; border-radius: 20px; border: 2px solid #10b981; max-width: 540px; text-align: center; box-shadow: 0 0 30px rgba(16, 185, 129, 0.3); }
            h1 { color: #34d399; margin-top: 0; font-size: 24px; }
            code { background: #030712; padding: 4px 8px; border-radius: 6px; color: #38bdf8; font-family: monospace; }
            .badge { display: inline-block; background: #10b98120; color: #34d399; border: 1px solid #10b98160; padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: bold; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">🌐 MULTI-DEVICE DOMAIN ENGINE: ${TARGET_DOMAIN}</span>
            <h1>SSL Connection Ready (502)</h1>
            <p>Target service on port <code>${targetPort}</code> is initializing...</p>
          </div>
        </body>
      </html>
    `);
  });

  req.pipe(proxyReq, { end: true });
});

// Secure WebSocket Upgrade (wss://)
server.on('upgrade', (req, socket, head) => {
  const isApi = req.url.startsWith('/api') || req.url.startsWith('/socket.io');
  const targetPort = isApi ? BACKEND_PORT : FRONTEND_PORT;

  const proxyOptions = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(proxyOptions);
  proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
    socket.write(
      `HTTP/1.1 101 Switching Protocols\r\n` +
        Object.keys(proxyRes.headers)
          .map((key) => `${key}: ${proxyRes.headers[key]}`)
          .join('\r\n') +
        '\r\n\r\n'
    );
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });
  proxyReq.on('error', () => socket.destroy());
  proxyReq.end();
});

// Listen on 0.0.0.0 (All Devices on Network & Internet)
server.listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`\n=============================================================`);
  console.log(`🌐  MULTI-DEVICE SECURE DOMAIN ENGINE ACTIVE FOR: date.pulse.com`);
  console.log(`📡  Listening on ALL Network Interfaces (0.0.0.0:${HTTPS_PORT})`);
  console.log(`📱  Local Wi-Fi Access: https://192.168.41.203:${HTTPS_PORT}`);
  console.log(`🔗  Domain Access: https://${TARGET_DOMAIN}:${HTTPS_PORT}`);
  console.log(`=============================================================\n`);
});

// HTTP Auto-Redirector on 0.0.0.0
http.createServer((req, res) => {
  const host = (req.headers.host || TARGET_DOMAIN).split(':')[0];
  const redirectUrl = `https://${host}:${HTTPS_PORT}${req.url}`;
  res.writeHead(301, { Location: redirectUrl });
  res.end(`Redirecting to Secure HTTPS: ${redirectUrl}`);
}).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`🔄 Multi-Device HTTP Auto-Redirector listening on 0.0.0.0:${HTTP_PORT}`);
});
