const db = require("../models");
const Story = db.story;
const Chat = db.chat;

// Create and Save a new Story
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    const error = new Error("Title cannot be empty!");
    error.statusCode = 400;
    throw error;
  }

  try {
    const newStory = await Story.create({
      title: req.body.title,
      story: req.body.story,
      isPublished: req.body.isPublished || false
    });

    // // Create a Chat for the new story
    // if (req.body.chat) {
    //   const newChat = await Chat.create({
    //     role: req.body.chat.role,
    //     message: req.body.chat.message,
    //     storyId: newStory.id // Associate the chat with the story
    //   });
    // }

    res.send(newStory);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Story."
    });
  }
};

// Retrieve all Stories from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Story.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};

// Find a single Story with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Story.findByPk(id, { include: ["chats"] }) // Include associated chats
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Story with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Story with id = " + id,
      });
    });
};

// Update a Story by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Story.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Story was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Story with id = ${id}. Maybe Story was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Story with id = " + id,
      });
    });
};

// Delete a Story with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Story.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Story was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Story with id = ${id}. Maybe Story was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Story with id = " + id,
      });
    });
};

// Delete all Stories from the database.
exports.deleteAll = (req, res) => {
  Story.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Stories were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all stories.",
      });
    });
};
