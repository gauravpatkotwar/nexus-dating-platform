/**
 * NATIVE CORE DOMAIN GATEWAY (100% Self-Built - Zero Third-Party Services)
 * Dedicated Target Domain: https://hook.nexus.com
 * Listening on Standard Ports: 80 (HTTP) & 443 (HTTPS)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const TARGET_DOMAIN = 'hook.nexus.com';
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
const HTTPS_PORT = 443;
const HTTP_PORT = 80;

// Load SSL/TLS Credentials
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

// 1. Native HTTPS Server on Standard Port 443
const secureServer = https.createServer(sslOptions, (req, res) => {
  const hostHeader = (req.headers.host || TARGET_DOMAIN).split(':')[0];
  const isApi = req.url.startsWith('/api') || req.url.startsWith('/socket.io');
  const targetPort = isApi ? BACKEND_PORT : FRONTEND_PORT;

  const options = {
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
      'x-native-domain-engine': 'hook-nexus-com-dedicated',
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.setHeader('X-Engine-Author', 'Self-Built-Native-Code');
    res.setHeader('X-Dedicated-Domain', TARGET_DOMAIN);
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>🔒 ${TARGET_DOMAIN} - Dedicated Native Engine</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #030712; color: #f9fafb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #111827; padding: 40px; border-radius: 20px; border: 2px solid #6366f1; max-width: 500px; text-align: center; }
            h1 { color: #818cf8; margin-top: 0; }
            .badge { background: #6366f120; color: #a5b4fc; border: 1px solid #6366f160; padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">DEDICATED NATIVE DOMAIN: ${TARGET_DOMAIN}</span>
            <h1>100% Custom Gateway Active</h1>
            <p>Target service on port ${targetPort} is ready.</p>
          </div>
        </body>
      </html>
    `);
  });

  req.pipe(proxyReq, { end: true });
});

// WebSocket Upgrade on Port 443
secureServer.on('upgrade', (req, socket, head) => {
  const isApi = req.url.startsWith('/api') || req.url.startsWith('/socket.io');
  const targetPort = isApi ? BACKEND_PORT : FRONTEND_PORT;

  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options);
  proxyReq.on('upgrade', (proxyRes, proxySocket) => {
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

secureServer.listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`\n=============================================================`);
  console.log(`🚀  DEDICATED NATIVE HTTPS ENGINE LIVE FOR: https://${TARGET_DOMAIN}`);
  console.log(`🔒  Listening on Standard Port 443 (HTTPS)`);
  console.log(`=============================================================\n`);
});

// 2. Native HTTP Redirector on Standard Port 80
http.createServer((req, res) => {
  const redirectUrl = `https://${TARGET_DOMAIN}${req.url}`;
  res.writeHead(301, { Location: redirectUrl });
  res.end(`Redirecting to https://${TARGET_DOMAIN}${req.url}`);
}).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`🔄 Native HTTP Redirector listening on Port 80 -> https://${TARGET_DOMAIN}`);
});
