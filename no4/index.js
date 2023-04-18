// Command-line Dictionary: Build a command-line dictionary app that fetches word definitions or translations from an API using Node.js' built-in http module and displays them to the user.

const http = require('http');

// Replace with your own Merriam-Webster API key
const apiKey = '4ee6d020-710d-4c37-9be9-60c7e4abd6cc';
const word = process.argv[2];

if (!word) {
  console.log('Please provide a word to look up.');
  process.exit(1);
}

const options = {
  hostname: 'www.dictionaryapi.com',
  path: `/api/v3/references/learners/json/${word}?key=${apiKey}`,
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const definitions = JSON.parse(data);
      if (definitions.length > 0) {
        console.log(`Definitions for "${word}":`);
        definitions.forEach((definition, index) => {
          console.log(`${index + 1}. ${definition.shortdef[0]}`);
        });
      } else {
        console.log(`No definitions found for "${word}".`);
      }
    } else {
      console.log(`Error fetching definitions for "${word}". Status code: ${res.statusCode}`);
    }
  });
});

req.on('error', (error) => {
  console.error(`Error fetching definitions for "${word}":`, error);
});

req.end();
