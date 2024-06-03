const db = require("../models");
const Country = db.country;

// Create and save a new Country

exports.create = async (req, res) => {

    // Validate request
    if (!req.body.name) {
        const error = new Error("Name cannot be empty!");
        error.statusCode = 400;
        res.status(400).send({
            message:
                error.message || "Some error occurred while sending message.",
        });
    }

    if (!req.body.description) {
        const error = new Error("Description cannot be empty!");
        error.statusCode = 400;
        res.status(400).send({
            message:
                error.message || "Some error occurred while sending message.",
        });
    }

    // Create a Country

    const country = {
        name: req.body.name,
        description: req.body.description,
    };

    // Save Country in the database

    Country.create(country)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });

}

// Retrieve all countries from the database.

exports.findAll = (req, res) => {

    Country.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });
}


// Find a single Country with an id

exports.findOne = (req, res) => {

    const id = req.params.id;

    Country.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Country with id=" + id,
            });
        });
}


// Update a Country by the id in the request

exports.update = (req, res) => {

    const id = req.params.id;

    Country.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Country was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Country with id=${id}. Maybe Country was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Country with id=" + id,
            });
        });
}


// Delete a Country with the specified id in the request

exports.delete = (req, res) => {

    const id = req.params.id;

    Country.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Country was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Country with id=${id}. Maybe Country was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Country with id=" + id,
            });
        });
}


// Delete all Countries from the database.

exports.deleteAll = (req, res) => {

    Country.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Countries were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });
}





