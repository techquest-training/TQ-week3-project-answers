const MarkdownToHtmlConverter = require('./index'); // Replace with the actual path to your MarkdownToHtmlConverter module
const markdownFilePath = 'example.md'; // Replace with the actual path to your test Markdown file

const markdownConverter = new MarkdownToHtmlConverter(markdownFilePath);
markdownConverter.convert();
