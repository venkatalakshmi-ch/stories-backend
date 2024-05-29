module.exports = (app) => {
  const Story = require("../controllers/story.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Story
  router.post("/stories/", Story.create);

  // Retrieve all stories
  router.get("/stories/", Story.findAll);

  // Retrieve a single Story with id
  router.get("/stories/:id", Story.findOne);

  // Update a Story with id
  router.put("/stories/:id", [authenticateRoute], Story.update);

  // Delete a Story with id
  router.delete("/stories/:id", [authenticateRoute], Story.delete);

  // Delete all Story
  router.delete("/stories/", [authenticateRoute], Story.deleteAll);

  app.use("/storiesapi", router);
};
