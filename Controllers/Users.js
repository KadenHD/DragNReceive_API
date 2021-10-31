import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import User from '../Models/User.js';

const deletePassword = {
    attributes: {
        exclude: ['password'] // Removing password from User response data
    }
}

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
    if (!req.body.lastname || !req.body.firstname || !req.body.email || !req.body.password || !req.body.roleId) {
        res.status(400).send({
            message: "Request not valid !"
        });
        return;
    }

    // Verify if email already exist
    const userExist = await User.findOne({ where: { email: req.body.email } })
    if (userExist) return res.status(400).send({
        message: 'Email already exists'
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a User
    const user = {
        id: uuidv4(),
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId
    }

    // Save User in the database
    User.create(user)
        .then(data => {
            res.status(200).send({
                message: `User ${user.firstname} ${user.lastname} created !`
            });
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
    const id = req.params.id;

    User.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: `User with id=${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id} : ${err}.`
            });
        });
}

export const updateUser = (req, res) => {
    // Validate request
    if (!req.body.lastname && !req.body.firstname && !req.body.email && !req.body.password && !req.body.roleId) {
        res.status(400).send({
            message: "Request not valid !"
        });
        return;
    }
    const id = req.params.id;
    const { firstname, lastname, email, password, roleId } = req.body;

    const user = User.findByPk(id);
    
    // Own User and Admin/Sadmin only
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (password) user.password = password; // password recovery for user
    // Admin/Sadmin only
    if (roleId) user.roleId = roleId;

    User.update(
        user,
        { where: { id: id } }
    )
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: `User with id=${id} was updated successfully!`
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not update User with id=${id} : ${err}.`
            });
        })
}
