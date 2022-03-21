const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { createOne, updateOne, deleteOne, findOne, findAll, deleteAll } = require('../sequlize/sequelize')

const { validationResult } = require('express-validator');

// Create and Save a new User
exports.createUser = (req, res) => {
    try {
        // Create a User
        const user = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            occupation: req.body.occupation,
            city: req.body.city,
            country: req.body.country
        };

        // Save User in the database
        createOne(user).then((data) => {
            if (data) {
                res.send({ message: "User added successfully", data: data.dataValues });
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

// Update a User by the id in the request
exports.updateUserDetails = async (req, res) => {
    try {
        const id = JSON.parse(req.params.id);

        updateOne(req.body, id).then((data) => {
            if (data) {
                res.send({
                    message: "User details updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: `Error updating User with id=${id}`
            });
        });
    } catch (err) {
        res.status(400).json(err);
    };
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = JSON.parse(req.params.id);
    deleteOne(id).then(num => {
        if (num == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};

// Find a single User with an id
exports.findUser = (req, res) => {
    const id = JSON.parse(req.params.id);
    findOne(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id=${id}.`
            });
        });
};

// Retrieve all Users from the database.
exports.findAllUser = (req, res) => {
    const searchby = req.query.search;
    findAll(searchby).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users details."
            });
        });
};

// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
    deleteAll().then(data => {
        if (data) {
            res.send({ message: `Users were deleted successfully!` });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all users details."
        });
    });
};
