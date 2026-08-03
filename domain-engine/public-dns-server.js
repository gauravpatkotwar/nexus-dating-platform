/**
 * AUTHORITATIVE PUBLIC DNS SERVER WITH VERCEL VERIFICATION & CNAME SUPPORT
 * Target Domain: hook.nexus.com
 * Verification TXT: vc-domain-verify=hook.nexus.com,9a6bac5ffbdf7234f25a
 * CNAME Target: 760c8e7650fcee19.vercel-dns-017.com.
 * Public A-Record: 49.15.249.115
 * 
 * Listens on UDP Port 53 on 0.0.0.0
 */

const dgram = require('dgram');

const DNS_PORT = 53;
const PUBLIC_IPV4 = '49.15.249.115';
const VERCEL_TXT = 'vc-domain-verify=hook.nexus.com,9a6bac5ffbdf7234f25a';
const VERCEL_CNAME = '760c8e7650fcee19.vercel-dns-017.com';

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  try {
    const transactionId = msg.subarray(0, 2);
    
    // Read Question Type (QTYPE) and Domain Name from request
    let offset = 12;
    let queryName = '';
    while (offset < msg.length && msg[offset] !== 0) {
      const len = msg[offset];
      if (queryName.length > 0) queryName += '.';
      queryName += msg.toString('utf8', offset + 1, offset + 1 + len);
      offset += len + 1;
    }
    offset++; // Skip null byte
    const qtype = msg.readUInt16BE(offset);

    const questionSection = msg.subarray(12, offset + 4);

    let answerSection;
    if (qtype === 16 || queryName.startsWith('_vercel')) {
      // TXT Record Response for Vercel Verification
      const txtBytes = Buffer.from(VERCEL_TXT, 'utf8');
      answerSection = Buffer.concat([
        Buffer.from([0xc0, 0x0c, 0x00, 0x10, 0x00, 0x01, 0x00, 0x00, 0x0e, 0x10]), // Type TXT (16)
        Buffer.from([0x00, txtBytes.length + 1, txtBytes.length]), // Length header
        txtBytes
      ]);
    } else if (qtype === 5) {
      // CNAME Record Response
      const cnameParts = VERCEL_CNAME.split('.');
      const cnameBufs = [];
      cnameParts.forEach(p => {
        cnameBufs.push(Buffer.from([p.length]));
        cnameBufs.push(Buffer.from(p, 'utf8'));
      });
      cnameBufs.push(Buffer.from([0x00]));
      const cnameTargetBuf = Buffer.concat(cnameBufs);

      answerSection = Buffer.concat([
        Buffer.from([0xc0, 0x0c, 0x00, 0x05, 0x00, 0x01, 0x00, 0x00, 0x0e, 0x10]), // Type CNAME (5)
        Buffer.from([0x00, cnameTargetBuf.length]),
        cnameTargetBuf
      ]);
    } else {
      // Default A-Record Response
      const ipParts = PUBLIC_IPV4.split('.').map(Number);
      answerSection = Buffer.from([
        0xc0, 0x0c, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x0e, 0x10,
        0x00, 0x04, ipParts[0], ipParts[1], ipParts[2], ipParts[3]
      ]);
    }

    const responseHeader = Buffer.from([
      transactionId[0], transactionId[1],
      0x84, 0x00,
      0x00, 0x01, // Question 1
      0x00, 0x01, // Answer 1
      0x00, 0x00,
      0x00, 0x00
    ]);

    const dnsPacket = Buffer.concat([responseHeader, questionSection, answerSection]);

    server.send(dnsPacket, rinfo.port, rinfo.address, (err) => {
      if (err) console.error('DNS send error:', err.message);
    });

    console.log(`📡 [DNS] Resolved ${queryName} (QTYPE: ${qtype}) for ${rinfo.address}:${rinfo.port}`);
  } catch (err) {
    console.error('DNS processing error:', err.message);
  }
});

server.on('error', (err) => {
  console.error('Public DNS Error:', err);
});

server.bind(DNS_PORT, '0.0.0.0', () => {
  console.log(`\n=============================================================`);
  console.log(`📡  NATIVE AUTHORITATIVE DNS SERVER ACTIVE ON PORT 53!`);
  console.log(`🌐  Verification TXT: _vercel.hook.nexus.com -> ${VERCEL_TXT}`);
  console.log(`🌐  CNAME Target: ${VERCEL_CNAME}`);
  console.log(`📍  Public IP A-Record: ${PUBLIC_IPV4}`);
  console.log(`=============================================================\n`);
});
