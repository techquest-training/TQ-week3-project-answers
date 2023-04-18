const CSVParser = require('./index');
const fs = require('fs');

const filePath = 'example.csv'; // Replace with the actual file path of your CSV file

const csvParser = new CSVParser(filePath);

csvParser.parse((err, records) => {
  if (err) {
    console.error('Error parsing CSV:', err);
    return;
  }

  console.log('Parsed CSV records:', records);

  // Write parsed data to a new file
  fs.writeFile('parsedFile.json', JSON.stringify(records, null, 2), (err) => {
    if (err) {
      console.error('Error writing parsed data to file:', err);
      return;
    }
    console.log('Parsed data written to parsedFile.json');
  });
});
