const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const readmePath = path.join(__dirname, 'README.md');
    fs.readFile(readmePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        return res.end('Error reading README');
      }
      // Simple HTML wrapper
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>devCRM</title></head><body><pre style="font-family:monospace;white-space:pre-wrap;word-wrap:break-word;">${data}</pre></body></html>`;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`devCRM server listening on port ${PORT}`);
});
