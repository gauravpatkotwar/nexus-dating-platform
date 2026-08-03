/**
 * AUTHORITATIVE PUBLIC DNS NAME SERVER (Built from scratch)
 * Single Domain Target: hook.nexus.com
 * Public IP: 49.15.249.115
 * 
 * Listens on UDP Port 53 on 0.0.0.0 (All Interfaces).
 * Responds authoritatively to global DNS queries for hook.nexus.com.
 */

const dgram = require('dgram');

const DNS_PORT = 53;
const PUBLIC_IPV4 = '49.15.249.115';
const DOMAIN = 'hook.nexus.com';

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  try {
    const transactionId = msg.subarray(0, 2);
    
    const responseHeader = Buffer.from([
      transactionId[0], transactionId[1],
      0x84, 0x00, // Response, Authoritative, No Error
      0x00, 0x01, // Questions: 1
      0x00, 0x01, // Answers: 1
      0x00, 0x00, // Authority RRs: 0
      0x00, 0x00  // Additional RRs: 0
    ]);

    let offset = 12;
    while (offset < msg.length && msg[offset] !== 0) {
      offset += msg[offset] + 1;
    }
    offset += 5;
    const questionSection = msg.subarray(12, offset);

    const ipParts = PUBLIC_IPV4.split('.').map(Number);
    const answerSection = Buffer.from([
      0xc0, 0x0c,             // Pointer to domain name at offset 12
      0x00, 0x01,             // Type: A (1)
      0x00, 0x01,             // Class: IN (1)
      0x00, 0x00, 0x0e, 0x10, // TTL: 3600 seconds
      0x00, 0x04,             // Data length: 4 bytes
      ipParts[0], ipParts[1], ipParts[2], ipParts[3]
    ]);

    const dnsPacket = Buffer.concat([responseHeader, questionSection, answerSection]);

    server.send(dnsPacket, rinfo.port, rinfo.address, (err) => {
      if (err) console.error('Public DNS send error:', err.message);
    });

    console.log(`📡 [DNS Engine] Resolved ${DOMAIN} -> ${PUBLIC_IPV4} for request from ${rinfo.address}:${rinfo.port}`);
  } catch (err) {
    console.error('Public DNS error:', err.message);
  }
});

server.on('error', (err) => {
  console.error('Public DNS Error:', err);
});

server.bind(DNS_PORT, '0.0.0.0', () => {
  console.log(`\n=============================================================`);
  console.log(`📡  NATIVE AUTHORITATIVE DNS SERVER ACTIVE ON PORT 53!`);
  console.log(`🌐  Dedicated Domain: ${DOMAIN}`);
  console.log(`📍  Public IP A-Record: ${PUBLIC_IPV4}`);
  console.log(`=============================================================\n`);
});
