module.exports = (app) => {
  const Story = require("../controllers/story.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Story
  router.post("/stories/", Story.create);

  // Retrieve all stories
  router.get("/stories/", Story.findAll);

  // Retrieve all published stories
  router.get("/stories/published", Story.findAllPublished);

  // Retrieve a single Story with id
  router.get("/stories/:id", Story.findOne);

  // Update a Story with id
  router.put("/stories/:id", [authenticateRoute], Story.update);

  // Delete a Story with id
  router.delete("/stories/:id", [authenticateRoute], Story.delete);

  // Delete all Story
  router.delete("/stories/", [authenticateRoute], Story.deleteAll);

  // Retrieve all by a user
  router.get("/stories/user/:userId", Story.findAllByUser);

  // Retrieve all published by a user
  router.get("/stories/published/:userId", Story.findAllPublishedByUser);

  // Retrieve all favorite stories for a user
  router.get("/stories/favorite/:userId", Story.findAllFavoriteByUser);

  // Check if a story is favorite for a user
  router.get("/stories/isFavorite/:storyId/:userId", [authenticateRoute], Story.isFavorite);
  

  // add story to favorite for a user
  router.post("/stories/addFavorite/:storyId/:userId", [authenticateRoute], Story.addFavorite);

  // remove story from favorite for a user
  router.delete("/stories/removeFavorite/:storyId/:userId", [authenticateRoute], Story.removeFavorite);


  // add feedback to a story by a user
  router.post("/stories/addFeedback/:storyId/:userId", [authenticateRoute], Story.addFeedback);

  // remove feedback from a story by a user
  router.delete("/stories/removeFeedback/:feedBackId", [authenticateRoute], Story.removeFeedback);

  // Retrieve all feedbacks for a story
  router.get("/stories/feedbacks/:storyId", Story.findAllFeedbacks);

  // Edit feedback for a story
  router.put("/stories/editFeedback/:feedBackId", [authenticateRoute], Story.editFeedback);

  app.use("/storiesapi", router);
};
