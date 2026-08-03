/**
 * CUSTOM DOMAIN HTTP GATEWAY & ROUTER (Built from scratch)
 * Domain Target: date.pulse.com
 * 
 * Implements a high-performance HTTP Domain Gateway for date.pulse.com:
 *  - Intercepts requests for date.pulse.com
 *  - Routes /api & /socket.io -> NestJS Backend (Port 4000)
 *  - Routes all other traffic -> Next.js Frontend (Port 3000)
 */

const http = require('http');

const TARGET_DOMAIN = 'date.pulse.com';
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 4000;
const PROXY_PORT = process.env.PORT || (process.getuid && process.getuid() === 0 ? 80 : 8080);

const server = http.createServer((req, res) => {
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
      'x-forwarded-proto': 'http',
      'x-forwarded-for': req.socket.remoteAddress,
      'x-nexus-domain-engine': 'built-from-scratch',
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // Add custom domain engine header
    res.setHeader('X-Domain-Engine', 'date.pulse.com-Built-From-Scratch');
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${TARGET_DOMAIN} - Domain Engine Active</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #090d16; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #111827; padding: 40px; border-radius: 20px; border: 2px solid #8b5cf6; max-width: 540px; text-align: center; box-shadow: 0 0 30px rgba(139, 92, 246, 0.3); }
            h1 { color: #a855f7; margin-top: 0; font-size: 24px; }
            code { background: #030712; padding: 4px 8px; border-radius: 6px; color: #38bdf8; font-family: monospace; }
            .badge { display: inline-block; background: #a855f720; color: #c084fc; border: 1px solid #a855f760; padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: bold; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">BUILT-FROM-SCRATCH DOMAIN ENGINE: ${TARGET_DOMAIN}</span>
            <h1>Service Standby (502)</h1>
            <p>The Domain Gateway for <code>${TARGET_DOMAIN}</code> is active and running!</p>
            <p>Target service on port <code>${targetPort}</code> is connecting...</p>
          </div>
        </body>
      </html>
    `);
  });

  req.pipe(proxyReq, { end: true });
});

// WebSocket Upgrade support for real-time chat & signals
server.on('upgrade', (req, socket, head) => {
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

server.listen(PROXY_PORT, () => {
  const portSuffix = PROXY_PORT === 80 ? '' : ':' + PROXY_PORT;
  console.log(`\n=============================================================`);
  console.log(`🚀  CUSTOM DOMAIN ENGINE BUILT FROM SCRATCH FOR: date.pulse.com`);
  console.log(`👉  Listening on Port: ${PROXY_PORT}`);
  console.log(`🔗  Domain URL: http://${TARGET_DOMAIN}${portSuffix}`);
  console.log(`=============================================================\n`);
});
