// URL Shortener: Create a URL shortener service that generates short URLs for long web addresses using Node.js and the built-in http and fs modules.

const http = require('http');
const fs = require('fs');
const shortid = require('shortid'); // A library to generate short IDs

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/shorten') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const longUrl = body.toString(); // Get the long URL from the request body
      const shortUrl = shortid.generate(); // Generate a short ID as the short URL
      const data = `${longUrl},${shortUrl}\n`; // Prepare data to write to file

      // Append the data to a file for storing the URL mappings
      fs.appendFile('urls.csv', data, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.end(`Short URL: http://localhost:3000/${shortUrl}`);
        }
      });
    });
  } else if (req.method === 'GET') {
    const shortUrl = req.url.slice(1); // Get the short URL from the request URL (excluding the leading '/')
    const data = fs.readFileSync('urls.csv', 'utf-8'); // Read the URL mappings file

    // Search for the short URL in the URL mappings file
    const lines = data.split('\n');
    let longUrl = '';
    lines.forEach((line) => {
      const [url, shortId] = line.split(',');
      if (shortId === shortUrl) {
        longUrl = url;
      }
    });

    if (longUrl) {
      // If long URL found, redirect to the original URL
      res.writeHead(301, { 'Location': longUrl });
      res.end();
    } else {
      // If short URL not found, return a 404 response
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    // Return a 404 response for all other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the HTTP server on port 3000
server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
