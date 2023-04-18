// Basic Chatbot: Create a basic chatbot that responds to user input using Node.js' built-in readline module and simple logic or pattern matching.

const readline = require('readline');

// Create readline interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to generate random items
function generateRandomItems() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  const selectedItems = [];
  while (selectedItems.length < 5) {
    const randomIndex = Math.floor(Math.random() * items.length);
    if (!selectedItems.includes(items[randomIndex])) {
      selectedItems.push(items[randomIndex]);
    }
  }
  return selectedItems;
}

// Function to get chatbot response based on user input
function getChatbotResponse(input) {
  let response = '';
  switch (input) {
    case 'name':
      response = 'What is your name?';
      break;
    case 'surname':
      response = 'What is your surname?';
      break;
    case 'items':
      response = 'Here are 5 randomly generated items:';
      const items = generateRandomItems();
      items.forEach((item, index) => {
        response += `\n${index + 1}. ${item}`;
      });
      response += '\nPlease choose an item from the list by entering the corresponding number:';
      break;
    default:
      response = 'I\'m sorry, I don\'t understand. Can you please rephrase your question?';
      break;
  }
  return response;
}

let name = '';
let surname = '';

// Start the conversation by asking for the user's name
console.log('Chatbot: Hi there! I can help you choose from a list of 5 randomly generated items.');
rl.question('Chatbot: What is your name? ', (input) => {
  name = input;
  // Continue the conversation by asking for the user's surname
  rl.question('Chatbot: What is your surname? ', (input) => {
    surname = input;
    // Continue the conversation by asking the user to choose from the list of items
    rl.question(getChatbotResponse('items'), (input) => {
      // Get chatbot response based on user's selected item
      const selectedNumber = parseInt(input);
      if (selectedNumber >= 1 && selectedNumber <= 5) {
        const selectedItem = generateRandomItems()[selectedNumber - 1];
        console.log(`Chatbot: ${name} ${surname}, you have selected: ${selectedItem} come again later!`);
      } else {
        console.log('Chatbot: Invalid input. Please try again.');
      }
      // Close readline interface
      rl.close();
    });
  });
});
