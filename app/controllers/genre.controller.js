const db = require("../models");
const Genre = db.genre;

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

    // Create a Genre

    const genre = {
        name: req.body.name,
        description: req.body.description,
    };

    // Save Genre in the database

    Genre.create(genre)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });

};
    
// Retrieve all genres from the database.

exports.findAll = (req, res) => {
    Genre.findAll()
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

// Find a single genre with an id

exports.findOne = (req, res) => {

    const id = req.params.id;

    Genre.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Chat with id=" + id,
            });
        });
}

// Update a genre by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    Genre.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Genre was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Genre with id=${id}. Maybe Genre was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Genre with id=" + id,
            });
        });
}



// Delete a genre with the specified id in the request

exports.delete = (req, res) => {

    const id = req.params.id;

    Genre.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Genre was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Genre with id=" + id,
            });
        });
}

// Delete all genres from the database.

exports.deleteAll = (req, res) => {
    Genre.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Genres were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while sending message.",
            });
        });
}

