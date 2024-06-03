module.exports = app => {
    const languages = require("../controllers/language.controller.js");

    var router = require("express").Router();

    // Create a new Language
    router.post("/", languages.create);

    // Retrieve all Languages
    router.get("/", languages.findAll);

    // Retrieve a single Language with id
    router.get("/:id", languages.findOne);

    // Update a Language with id
    router.put("/:id", languages.update);

    // Delete a Language with id
    router.delete("/:id", languages.delete);

    // Delete all Languages
    router.delete("/", languages.deleteAll);


    app.use("/storiesapi/languages", router);
};
