const db = require("../models");
const Story = db.story;
const Chat = db.chat;
const User = db.user;
const FavoriteStory = db.favoriteStory;

// Create and Save a new Story
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    const error = new Error("Title cannot be empty!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating story.",
    });
  }

  if (!req.body.userId) {
    const error = new Error("UserId cannot be empty!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating story.",
    });
  }

  try {
    const newStory = await Story.create({
      title: req.body.title,
      story: req.body.story,
      userId: req.body.userId,
      isPublished: req.body.isPublished || false
    });

    res.send(newStory);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Story."
    });
  }
};

// Retrieve all Stories from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Story.findAll({ where: condition, include: { model: User, as: "user", attributes:['firstName', 'lastName'] } })
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

  Story.findByPk(id,{include: { model: User, as: "user", attributes:['firstName', 'lastName'] }}) // Include associated chats
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

  Chat.destroy({
    where: { storyId: id },
  })

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


// Add a story to favorite for a user
exports.addFavorite = async (req, res) => {
  const storyId = req.params.storyId;
  const userId = req.params.userId;

  try {
    const newFavoriteStory = await FavoriteStory.create({
      storyId: storyId,
      userId: userId,
    });

    res.send(newFavoriteStory);
    
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: err.message || "Some error occurred while adding story to favorite for User.",
    });
  }
};


// Remove a story from favorite for a user

exports.removeFavorite = (req, res) => {
  const storyId = req.params.storyId;
  const userId = req.params.userId;

  FavoriteStory.destroy({
    where: { storyId: storyId, userId: userId },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Story was removed from favorite successfully!",
        });
      } else {
        res.send({
          message: `Cannot remove Story from favorite with storyId = ${storyId} and userId
          = ${userId}. Maybe Story was not found!`,
        });
      }
    }
    )
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not remove Story from favorite with storyId = " + story
      });
    }
    );
}


// Check if a story is favorite for a user

exports.isFavorite = (req, res) => {
  const storyId = req.params.storyId;
  const userId = req.params.userId;

  FavoriteStory.findOne({
    where: { storyId: storyId, userId: userId },
  })
    .then((data) => {
      if(data){
        res.send({isFavorite: true});
      }else{
        res.send({isFavorite: false});
      }
    }
    )
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error checking if Story is favorite for User.",
      });
    }
    );
}

