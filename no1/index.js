// HTTP Server: Build a simple HTTP server that listens to incoming requests and sends back responses using only the built-in http module in Node.js.



// Import the http module
const http = require('http');

// Define the port number and host for the server to listen on
const PORT = 3000;
const HOST = 'localhost';

// Create a server instance
const server = http.createServer((req, res) => {

  // Set the response header
  res.setHeader('Content-Type', 'text/plain');

  // Send a response
  res.end('Hello, World!');
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
