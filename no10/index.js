const fs = require('fs');
const path = require('path');
const readline = require('readline');

class FileSearch {
  constructor(directory, pattern) {
    this.directory = directory;
    this.pattern = pattern;
    this.results = [];
  }

  search() {
    this.results = [];
    this._searchRecursively(this.directory, this.pattern);
    return this.results;
  }

  displayResults() {
    console.log('Search Results:');
    this.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result}`);
    });
  }

  _searchRecursively(dir, pattern) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        this._searchRecursively(filePath, pattern);
      } else {
        if (file.match(pattern)) {
          this.results.push(filePath);
        }
      }
    }
  }

  getFileCount() {
    return this.results.length;
  }

  getMatchingFiles() {
    return this.results;
  }

  getDirectory() {
    return this.directory;
  }

  getPattern() {
    return this.pattern;
  }
}

// Create a readline interface for getting user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get user input for directory and pattern
rl.question('Enter the directory path: ', (directory) => {
  rl.question('Enter the search pattern: ', (pattern) => {
    // Create a FileSearch instance with the directory and pattern
    const fileSearch = new FileSearch(directory, new RegExp(pattern));

    // Get user input for search method
    rl.question('Select search method (1 for search(), 2 for displayResults(), 3 for getFileCount(), 4 for getMatchingFiles(), 5 for getDirectory(), 6 for getPattern()): ', (method) => {
      // Prompt user for expected data type for response
      let dataType = '';
      if (method === '3') {
        dataType = 'number';
      } else if (method === '4' || method === '5' || method === '6') {
        dataType = 'string';
      }

      // Prompt user for response
      rl.question(`Enter expected data type for response (${dataType}): `, (response) => {
        // Convert response to expected data type
        if (dataType === 'number') {
          response = parseInt(response);
        }

        // Call the selected method on the fileSearch instance
        let result;
        switch (method) {
          case '1':
            result = fileSearch.search();
            console.log('Search Results:', result);
            break;
          case '2':
            fileSearch.displayResults();
            break;
          case '3':
            result = fileSearch.getFileCount();
            console.log('File Count:', result);
            break;
          case '4':
            result = fileSearch.getMatchingFiles();
            console.log('Matching Files:', result);
            break;
          case '5':
            result = fileSearch.getDirectory();
            console.log('Directory:', result);
            break;
          case '6':
            result = fileSearch.getPattern();
            console.log('Pattern:', result);
            break;
          default:
            console.log('Invalid search method selection.');
        }

        // Close the readline interface
        rl.close();
      });
    });
  });
});
