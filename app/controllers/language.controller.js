const db = require("../models");
const Language = db.language;

// Create and Save a new Chat
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

    // Create a Language

    const chat = {
        name: req.body.name,
        description: req.body.description,
    };

    // Save Language in the database

    Language.create(chat)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });

};
    
// Retrieve all languages from the database.

exports.findAll = (req, res) => {
    Language.findAll()
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

// Find a single language with an id

exports.findOne = (req, res) => {

    const id = req.params.id;

    Language.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Chat with id=" + id,
            });
        });
}

// Update a language by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    Language.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Language was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Language with id=${id}. Maybe Language was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Language with id=" + id,
            });
        });
}



// Delete a language with the specified id in the request

exports.delete = (req, res) => {

    const id = req.params.id;

    Language.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Language was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Language with id=${id}. Maybe Language was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Language with id=" + id,
            });
        });
}

// Delete all languages from the database.

exports.deleteAll = (req, res) => {
    Language.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Languages were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });
}

