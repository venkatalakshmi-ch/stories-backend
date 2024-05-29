module.exports = app => {
    const chats = require("../controllers/chat.controller.js");

    var router = require("express").Router();

    // Create a new Chat
    router.post("/", chats.create);

    // Retrieve all Chats
    router.get("/", chats.findAll);

    // Retrieve a single Chat with id
    router.get("/:id", chats.findOne);

    // Update a Chat with id
    router.put("/:id", chats.update);

    // Delete a Chat with id
    router.delete("/:id", chats.delete);

    // Delete all Chats
    router.delete("/", chats.deleteAll);

    router.get("/story/:storyId", chats.findByStoryId);

    app.use("/storiesapi/chat", router);
};
