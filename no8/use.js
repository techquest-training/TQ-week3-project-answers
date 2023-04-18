const http = require('http');

// Define the URL and options for the request
const requestOptions = {
  hostname: 'localhost',
  port: 3000, // Port on which the reverse proxy server is running
  path: '/', // URL path for the backend server to forward the request
  method: 'GET', // HTTP method for the request
};

// Send a request to the reverse proxy server
const req = http.request(requestOptions, (res) => {
  console.log(`Status code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);

  // Receive the response from the reverse proxy server
  res.on('data', (chunk) => {
    console.log(`Body: ${chunk}`);
  });

  res.on('end', () => {
    console.log('Response ended');
  });
});

// End the request
req.end();
