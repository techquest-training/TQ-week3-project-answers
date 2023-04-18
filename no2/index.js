// File System Manipulation: Create a program that interacts with the file system, allowing users to perform operations such as creating, reading, updating, and deleting files or directories using Node.js' built-in fs module.


const fs = require('fs');

class FileSystem {
  constructor() {
    this.log = []; // Array to keep track of file system operations
  }

  // Method to create a directory
  createDirectory(directoryName) {
    fs.mkdirSync(directoryName);
    this.log.push(`Directory created: ${directoryName}`);
  }

  // Method to create a file
  createFile(filePath, fileContent) {
    fs.writeFileSync(filePath, fileContent);
    this.log.push(`File created: ${filePath}`);
  }

  // Method to read a file
  readFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    this.log.push(`File read: ${filePath}`);
    return data;
  }

  // Method to update a file
  updateFile(filePath, appendedText) {
    fs.appendFileSync(filePath, appendedText);
    this.log.push(`File updated: ${filePath}`);
  }

  // Method to delete a file
  deleteFile(filePath) {
    fs.unlinkSync(filePath);
    this.log.push(`File deleted: ${filePath}`);
  }

  // Method to delete a directory
  deleteDirectory(directoryName) {
    fs.rmdirSync(directoryName);
    this.log.push(`Directory deleted: ${directoryName}`);
  }

  // Method to get the log of operations
  getLog() {
    return this.log;
  }
}

// Export the FileSystem class
module.exports = FileSystem;
