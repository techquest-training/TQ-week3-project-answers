const fs = require('fs');

class CSVParser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  parse(callback) {
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        callback(err);
        return;
      }

      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');
      const records = [];

      for (let i = 1; i < lines.length; i++) {
        const record = {};
        const fields = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          record[headers[j]] = fields[j];
        }

        records.push(record);
      }

      callback(null, records);
    });
  }
}

module.exports = CSVParser;
