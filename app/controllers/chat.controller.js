const db = require("../models");
const Chat = db.chat;
const axios = require('axios');

// Create and Save a new Chat
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.message) {
        const error = new Error("Message cannot be empty!");
        error.statusCode = 400;
        res.status(400).send({
            message:
              error.message || "Some error occurred while sending message.",
          });
    }

    if(!req.body.storyId) {
        const error = new Error("StoryId cannot be empty!");
        error.statusCode = 400;
        res.status(400).send({
            message:
              error.message || "Some error occurred while sending message.",
          });
    }

    try {

        const chatHistory = await Chat.findAll({ where: { storyId: req.body.storyId } });
        // Send request to AI service
        const aiResponse = await axios.post('https://api.cohere.com/v1/chat', {
            model: "command-r-plus",
            message: req.body.message,
            temperature: 0.3,
            chat_history: chatHistory,
            stream: false,
            connectors: [{"id":"web-search"}]
        }, {
            headers: {
                'Authorization': `Bearer VOw44bwgHiV4081ScpCWXL1peLhvFss1z1dRMF6y`,
                'Content-Type': 'application/json'
            }
        });

        console.log(aiResponse.data);

        // Get the AI's response message
        const aiMessage = aiResponse.data.text;

        // Save User's message to the database
        const userMessage = await Chat.create({
            role: "User",
            message: req.body.message,
            storyId: req.body.storyId
        });

        // Save AI's response to the database
        const chatbotMessage = await Chat.create({
            role: "Chatbot",
            message: aiMessage,
            storyId: req.body.storyId
        });

        // Send both messages back to the client
        res.send([userMessage, chatbotMessage]);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Chat."
        });
    }
};

// Retrieve all Chats from the database.
exports.findAll = (req, res) => {
    Chat.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving chats.",
            });
        });
};

// Find a single Chat with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Chat.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Chat with id = ${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error retrieving Chat with id = " + id,
            });
        });
};

// Update a Chat by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Chat.update(req.body, {
        where: { id: id },
    })
        .then((number) => {
            if (number == 1) {
                res.send({
                    message: "Chat was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Chat with id = ${id}. Maybe Chat was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Chat with id = " + id,
            });
        });
};

// Delete a Chat with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Chat.destroy({
        where: { id: id },
    })
        .then((number) => {
            if (number == 1) {
                res.send({
                    message: "Chat was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Chat with id = ${id}. Maybe Chat was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Chat with id = " + id,
            });
        });
};

// Delete all Chats from the database.
exports.deleteAll = (req, res) => {
    Chat.destroy({
        where: {},
        truncate: false,
    })
        .then((number) => {
            res.send({ message: `${number} Chats were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all chats.",
            });
        });
};


// Find all Chats by storyId
exports.findByStoryId = (req, res) => {
    const storyId = req.params.storyId;

    Chat.findAll({ where: { storyId: storyId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || `Error retrieving Chats with storyId = ${storyId}`,
            });
        }
        );
};