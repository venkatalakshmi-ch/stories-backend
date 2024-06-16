module.exports = app => {
    const ageGroups = require("../controllers/ageGroup.controller.js");

    var router = require("express").Router();

    router.post("/", ageGroups.create);

    router.get("/", ageGroups.findAll);

    router.get("/:id", ageGroups.findOne);

    router.put("/:id", ageGroups.update);

    router.delete("/:id", ageGroups.delete);

    router.delete("/", ageGroups.deleteAll);

    app.use("/storiesapi/age_groups", router);
};
