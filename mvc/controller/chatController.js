// Import required dependencies or modules
const apiClient = require('./apiClient');
const chatModel = require('../models/chatModel');
const chatView = require('../views/chatView');

// Handle a request to send a chat message
async function sendMessage(request, response) {
  try {
    const { message, sender, recipient } = request.body;

    // Validate the input message and sender/recipient information if required

    // Make a request to the Chat Swagger API to send the message
    const sendMessageResponse = await apiClient.sendMessage(message, sender, recipient);

    // Update the local chat model with the sent message
    chatModel.addMessage(sendMessageResponse);

    // Render the updated chat view
    const chatHtml = chatView.renderChat(chatModel.getChatHistory());

    // Send the updated chat view as the response
    response.status(200).send(chatHtml);
  } catch (error) {
    // Handle and log any errors that occur
    console.error('Error sending message:', error);
    response.status(500).send('Error sending message');
  }
}

// Handle a request to fetch the chat history
async function getChatHistory(request, response) {
  try {
    // Make a request to the Chat Swagger API to fetch the chat history
    const chatHistoryResponse = await apiClient.getChatHistory();

    // Update the local chat model with the fetched chat history
    chatModel.setChatHistory(chatHistoryResponse);

    // Render the chat history view
    const chatHtml = chatView.renderChat(chatModel.getChatHistory());

    // Send the chat history view as the response
    response.status(200).send(chatHtml);
  } catch (error) {
    // Handle and log any errors that occur
    console.error('Error fetching chat history:', error);
    response.status(500).send('Error fetching chat history');
  }
}

// Export the controller functions for use in other modules
module.exports = {
  sendMessage,
  getChatHistory,
};
