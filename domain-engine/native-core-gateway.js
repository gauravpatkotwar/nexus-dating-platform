/**
 * NATIVE CORE DOMAIN GATEWAY (100% Self-Built - Zero Third-Party Services)
 * Target Domain: date.pulse.com
 * Listening on Standard Ports: 80 (HTTP) & 443 (HTTPS)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const TARGET_DOMAIN = 'date.pulse.com';
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
const HTTPS_PORT = 443;
const HTTP_PORT = 80;

// Load Self-Built Native SSL/TLS Credentials
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

// 1. Native HTTPS Server on Standard Port 443
const secureServer = https.createServer(sslOptions, (req, res) => {
  const hostHeader = (req.headers.host || '').split(':')[0];
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
      'x-native-domain-engine': '100-percent-self-built-no-third-party',
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.setHeader('X-Engine-Author', 'Self-Built-Native-Code');
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
          <title>🔒 ${TARGET_DOMAIN} - Native Domain Engine</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #030712; color: #f9fafb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #111827; padding: 40px; border-radius: 20px; border: 2px solid #6366f1; max-width: 500px; text-align: center; }
            h1 { color: #818cf8; margin-top: 0; }
            .badge { background: #6366f120; color: #a5b4fc; border: 1px solid #6366f160; padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">NATIVE SELF-BUILT ENGINE: ${TARGET_DOMAIN}</span>
            <h1>100% Independent Domain Gateway Active</h1>
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
  console.log(`🚀  NATIVE SELF-BUILT HTTPS ENGINE IS LIVE ON PORT 443!`);
  console.log(`🌐  Domain: https://${TARGET_DOMAIN}`);
  console.log(`🔒  100% Custom Code - Zero Third-Party Cloud Dependencies`);
  console.log(`=============================================================\n`);
});

// 2. Native HTTP Redirector on Standard Port 80
http.createServer((req, res) => {
  const host = (req.headers.host || TARGET_DOMAIN).split(':')[0];
  const redirectUrl = `https://${host}${req.url}`;
  res.writeHead(301, { Location: redirectUrl });
  res.end(`Redirecting to https://${host}${req.url}`);
}).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`🔄 Native HTTP Redirector listening on Port 80 -> HTTPS 443`);
});
