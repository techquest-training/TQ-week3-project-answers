// Reverse Proxy: Create a reverse proxy server that forwards incoming requests to different backend servers based on routing rules using Node.js' built-in http module.

const http = require('http');
const url = require('url');

// Define routing rules
const routingRules = {
  '/': 'https://w3schools.com',
  '/': 'https://www.google.com',
};

// Create the reverse proxy server
const proxyServer = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const targetUrl = routingRules[parsedUrl.pathname];

  if (targetUrl) {
    // Forward the request to the backend server
    const proxyReq = http.request({
      hostname: url.parse(targetUrl).hostname,
      path: parsedUrl.path,
      method: req.method,
      headers: req.headers,
    }, (proxyRes) => {
      // Forward the response from the backend server to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    // Forward the request body to the backend server
    req.pipe(proxyReq, { end: true });

  } else {
    // Return a 404 response for requests that do not match any routing rules
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the proxy server on port 3000
const port = 3000;
proxyServer.listen(port, () => {
  console.log(`Reverse proxy server is listening on port ${port}`);
});
