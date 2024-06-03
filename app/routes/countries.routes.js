module.exports = app => {
    const countries = require("../controllers/countries.controller.js");

    var router = require("express").Router();

    router.post("/", countries.create);

    router.get("/", countries.findAll);

    router.get("/:id", countries.findOne);

    router.put("/:id", countries.update);

    router.delete("/:id", countries.delete);

    router.delete("/", countries.deleteAll);

    app.use("/storiesapi/countries", router);
};
