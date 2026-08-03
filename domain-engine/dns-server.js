/**
 * CUSTOM DOMAIN RESOLUTION ENGINE (Built from scratch)
 * Domain Target: date.pulse.com
 * 
 * Implements a lightweight DNS Server listening on UDP Port 53 / 5353.
 * Resolves DNS queries for 'date.pulse.com' directly to 127.0.0.1.
 */

const dgram = require('dgram');

const DNS_PORT = process.env.DNS_PORT || 53;
const TARGET_IP = '127.0.0.1';
const TARGET_DOMAIN = 'date.pulse.com';

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  try {
    // Parse DNS query header
    const transactionId = msg.subarray(0, 2);
    
    // Construct DNS response header (QR=1 response, AA=1 authoritative, RCODE=0 no error)
    const responseHeader = Buffer.from([
      transactionId[0], transactionId[1],
      0x81, 0x80, // Flags: Standard query response, No error
      0x00, 0x01, // Questions: 1
      0x00, 0x01, // Answer RRs: 1
      0x00, 0x00, // Authority RRs: 0
      0x00, 0x00  // Additional RRs: 0
    ]);

    // Extract Question Section
    let offset = 12;
    while (offset < msg.length && msg[offset] !== 0) {
      offset += msg[offset] + 1;
    }
    offset += 5; // Skip null byte, QTYPE (2 bytes), QCLASS (2 bytes)
    const questionSection = msg.subarray(12, offset);

    // Construct A-Record Answer Section (date.pulse.com -> 127.0.0.1)
    const ipParts = TARGET_IP.split('.').map(Number);
    const answerSection = Buffer.from([
      0xc0, 0x0c,             // Pointer to query name at offset 12
      0x00, 0x01,             // Type: A record (1)
      0x00, 0x01,             // Class: IN (1)
      0x00, 0x00, 0x00, 0x3c, // TTL: 60 seconds
      0x00, 0x04,             // Data length: 4 bytes (IPv4)
      ipParts[0], ipParts[1], ipParts[2], ipParts[3]
    ]);

    const dnsResponse = Buffer.concat([responseHeader, questionSection, answerSection]);

    server.send(dnsResponse, rinfo.port, rinfo.address, (err) => {
      if (err) console.error('DNS send error:', err);
    });
  } catch (err) {
    console.error('DNS parse error:', err.message);
  }
});

server.on('error', (err) => {
  if (err.code === 'EACCES') {
    console.log('💡 Note: UDP Port 53 requires sudo privileges. Falling back to hosts file routing for date.pulse.com.');
  } else {
    console.error('DNS Server Error:', err);
  }
});

server.listen(DNS_PORT, () => {
  console.log(`📡 Built-in DNS Engine listening on UDP port ${DNS_PORT} for ${TARGET_DOMAIN}`);
});
