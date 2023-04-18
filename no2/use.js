// Import the FileSystem class
const FileSystem = require('./index');

// Create a new instance of the FileSystem class
const fs = new FileSystem();

// Create a directory
fs.createDirectory('my_directory');

// Create a file with content
fs.createFile('my_directory/my_file.txt', 'Hello, world!');

// Read the content of a file
const fileContent = fs.readFile('my_directory/my_file.txt');
console.log('File content:', fileContent);

// Update a file
fs.updateFile('my_directory/my_file.txt', ' Appended text.');
console.log('File updated successfully!');

// Read the updated content of the file
const updatedFileContent = fs.readFile('my_directory/my_file.txt');
console.log('Updated file content:', updatedFileContent);

// Delete a file
fs.deleteFile('my_directory/my_file.txt');
console.log('File deleted successfully!');

// Delete a directory
fs.deleteDirectory('my_directory');
console.log('Directory deleted successfully!');

// Get the log of operations
const log = fs.getLog();
console.log('Log of operations:', log);
