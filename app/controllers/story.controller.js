const db = require("../models");
const Story = db.story;
const Chat = db.chat;
const User = db.user;
const FavoriteStory = db.favoriteStory;
const Language = db.language;
const Genre = db.genre;
const Country = db.country;
const Feedback = db.feedback;
const Agegroup = db.ageGroup;

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
      isPublished: req.body.isPublished || false,
      languageId: req.body.languageId,
      genreId: req.body.genreId,
      countryId: req.body.countryId,
      ageGroupId: req.body.ageGroupId
    });

    res.send(newStory);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Story."
    });
  }
};


// Retrieve all Stories published in the database.
exports.findAllPublished = (req, res) => {
  Story.findAll({
    where: { isPublished: true },
    include: [
      { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] },
      { model: Language, as: "language" },
      { model: Genre, as: "genre" },
      { model: Country, as: "country" },
      { model: Agegroup, as: "ageGroup" }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};

// Retrieve all Stories from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Story.findAll({
    where: condition,
    include: [
      { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] },
      { model: Language, as: "language" },
      { model: Genre, as: "genre" },
      { model: Country, as: "country" },
      { model: Agegroup, as: "ageGroup" }
    ]
  })
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

  Story.findByPk(id, {
    include:
      [
        { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] },
        { model: Language, as: "language" },
        { model: Genre, as: "genre" },
        { model: Country, as: "country" },
        { model: Agegroup, as: "ageGroup" }
      ]
  }) // Include associated chats
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


// Retrieve all Stories published by a user
exports.findAllPublishedByUser = (req, res) => {
  const userId = req.params.userId;

  Story.findAll({
    where: { userId: userId, isPublished: true },
    include: [
      { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] },
      { model: Language, as: "language" },
      { model: Genre, as: "genre" },
      { model: Country, as: "country" },
      { model: Agegroup, as: "ageGroup" }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
}

// Retrieve all Stories by a user
exports.findAllByUser = (req, res) => {
  const userId = req.params.userId;

  Story.findAll({
    where: { userId: userId },
    include: [
      { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] },
      { model: Language, as: "language" },
      { model: Genre, as: "genre" },
      { model: Country, as: "country" },
      { model: Agegroup, as: "ageGroup" }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
}

// Retrieve all favorite stories for a user
exports.findAllFavoriteByUser = (req, res) => {

  const userId = req.params.userId;

  FavoriteStory.findAll({ where: { userId: userId } })
    .then((data) => {
      // Get all storyIds
      const storyIds = data.map((favorite) => favorite.storyId);
      Story.findAll({
        where: { id: storyIds },
        include: [
          { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] },
          { model: Language, as: "language" },
          { model: Genre, as: "genre" },
          { model: Country, as: "country" },
          { model: Agegroup, as: "ageGroup" }
        ]
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving favorite stories.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving favorite stories.",
      });
    });

}


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
      if (data) {
        res.send({ isFavorite: true });
      } else {
        res.send({ isFavorite: false });
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


// Add feedback to a story by a user

exports.addFeedback = async (req, res) => {
  const storyId = req.params.storyId;
  const userId = req.params.userId;

  try {
    const newFeedback = await Feedback.create({
      message: req.body.message,
      storyId: storyId,
      userId: userId,
    });

    res.send(newFeedback);

  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: err.message || "Some error occurred while adding feedback to story for User.",
    });
  }
}


// Remove feedback from a story by a user

exports.removeFeedback = (req, res) => {
  const feedBackId = req.params.feedBackId;

  Feedback.destroy({
    where: { id: feedBackId },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Feedback was removed successfully!",
        });
      } else {
        res.send({
          message: `Cannot remove Feedback with id = ${feedBackId}. Maybe Feedback was not found!`,
        });
      }
    }
    )
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not remove Feedback with id = " + feedBackId
      });
    }
    );
}


// Retrieve all feedbacks for a story

exports.findAllFeedbacks = (req, res) => {

  const storyId = req.params.storyId;

  Feedback.findAll({
    where: { storyId: storyId },
    include: [
      { model: User, as: "user", attributes: ['firstName', 'lastName', 'id'] }
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving feedbacks.",
      });
    });
}


// Edit feedback for a story

exports.editFeedback = (req, res) => {
  const feedBackId = req.params.feedBackId;

  Feedback.update(req.body, {
    where: { id: feedBackId },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Feedback was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Feedback with id = ${feedBackId}. Maybe Feedback was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Feedback with id = " + feedBackId,
      });
    });
}


