const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const readmePath = path.join(__dirname, 'README.md');
    const marked = require('marked');
fs.readFile(readmePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        return res.end('Error reading README');
      }
      // Simple HTML wrapper
      const rendered = marked(data);
const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>devCRM</title><style>body{font-family:Arial,sans-serif;background:#f9f9f9;color:#333;margin:2rem;}h1{color:#2c3e50;}pre{background:#fff;padding:1rem;border:1px solid #ddd;border-radius:4px;}</style></head><body>${rendered}</body></html>`;
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
