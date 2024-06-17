const db = require("../models");
const AgeGroup = db.ageGroup;

// Create and Save a new AgeGroup has from, to, description

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.from || !req.body.to || !req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a AgeGroup
    const ageGroup = {
        from: req.body.from,
        to: req.body.to,
        description: req.body.description
    };

    // Save AgeGroup in the database
    AgeGroup.create(ageGroup)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the AgeGroup."
            });
        });
};


// Retrieve all AgeGroups from the database.

exports.findAll = (req, res) => {
    const from = req.query.from;
    var condition = from ? { from: { [Op.like]: `%${from}%` } } : null;

    AgeGroup.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ageGroups."
            });
        });
}

// Find a single AgeGroup with an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    AgeGroup.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving AgeGroup with id=" + id
            });
        });
}


// Update a AgeGroup by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    AgeGroup.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AgeGroup was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AgeGroup with id=${id}. Maybe AgeGroup was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AgeGroup with id=" + id
            });
        });
}


// Delete a AgeGroup with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    AgeGroup.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AgeGroup was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete AgeGroup with id=${id}. Maybe AgeGroup was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AgeGroup with id=" + id
            });
        });
}



// Delete all AgeGroups from the database.

exports.deleteAll = (req, res) => {

    AgeGroup.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} AgeGroups were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all ageGroups."
            });
        });
}