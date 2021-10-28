import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import User from '../Models/User.js';

export const findAllUsers = (req, res) => {
    User.findAll(deletePassword)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Users : ${err}.`
            });
        });
}

export const createUser = async (req, res) => {
    // Validate request
    if (!req.body.lastName || !req.body.firstName || !req.body.email || !req.body.password || !req.body.roleId) {
        res.status(400).send({
            message: "Request not valid !"
        });
        return;
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a User
    const user = {
        id: uuidv4(),
        lastname: req.body.lastName,
        firstname: req.body.firstName,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId
    }

    // Save User in the database
    User.create(user)
        .then(data => {
            res.status(200).send(`User ${user.firstname} ${user.lastname} created !`);
        })
        .catch(err => {
            res.status(500).send({
                message: `Some error occurred while creating the User : ${err}.`
            });
        });
}

export const findOneUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, deletePassword)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({
                    message: `User with id=${id} does not exist.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id=${id} : ${err}.`
            });
        });
}

export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with the id ${id} deleted from the DataBase`);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;

    res.send(`User with the id ${id} patched elements !`);
}

const deletePassword = {
    attributes: {
        exclude: ['password'] // Removing password from User response data
    }
}