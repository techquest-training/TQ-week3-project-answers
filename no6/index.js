// Markdown to HTML Converter: Build a program that converts Markdown files to HTML using Node.js' built-in fs module and a Markdown parsing library like marked.


const fs = require('fs');
const marked = require('marked');

class MarkdownToHtmlConverter {
  constructor(markdownFilePath) {
    this.markdownFilePath = markdownFilePath;
  }

  convert() {
    fs.readFile(this.markdownFilePath, 'utf8', (err, markdownContent) => {
      if (err) {
        console.error('Error reading Markdown file:', err);
        return;
      }

      // Convert Markdown to HTML using marked library
      const htmlContent = marked.marked(markdownContent);

      // Write HTML content to a new file
      fs.writeFile('output.html', htmlContent, (err) => {
        if (err) {
          console.error('Error writing HTML file:', err);
          return;
        }
        console.log('Markdown converted to HTML and written to output.html');
      });
    });
  }
}

module.exports = MarkdownToHtmlConverter;
