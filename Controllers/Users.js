import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { User } from '../Models/Models.js';

const deletePassword = {
    attributes: {
        exclude: ['password'] // Removing password from User response data
    }
}

export const findAllUsers = (req, res) => {
    User.findAll(deletePassword)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche d'utilisateurs : ${err}.`
            });
        });
}

export const createUser = async (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.lastname || !req.body.firstname || !req.body.email || !req.body.password || !req.body.roleId) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }

    // Verify if email already exist
    const userExist = await User.findOne({ where: { email: req.body.email } })
    if (userExist) return res.status(400).json({
        error: `L'email existe déjà.`
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
            res.status(200).json({
                success: `L'utilisateur du nom de ${user.firstname} ${user.lastname} a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de l'utilisateur : ${err}.`
            });
        });
}

export const findOneUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, deletePassword)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    error: `L'utilisateur avec l'id ${id} n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de l'utilisateur d'id ${id} : ${err}.`
            });
        });
}

export const deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    success: `L'utilisateur avec l'identifiant ${id} a bien été supprimé.`
                });
            } else {
                res.json({
                    error: `Impossible de supprimer l'utilisateur d'id ${id}. Peut-être que l'utilisateur n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de l'utilisateur d'id ${id} : ${err}.`
            });
        });
}

export const updateUser = async (req, res) => {
    // Validate request
    if (!req.body.lastname && !req.body.firstname && !req.body.email && !req.body.password && !req.body.roleId) {
        res.status(400).json({
            error: "Requête non-valide."
        });
        return;
    }
    const { firstname, lastname, email, password, roleId } = req.body;

    const id = req.params.id;
    const user = User.findByPk(id);
    
    // Own User, Admin and Sadmin only
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    // User only
    if (password) user.password = await bcrypt.hash(password, 10); 
    // Sadmin only
    if (roleId) user.roleId = roleId;

    User.update(
        user,
        { where: { id: id } }
    )
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    success: `L'utilisateur d'id ${id} a bien été modifié`
                });
            } else {
                res.json({
                    error: `Impossible de modifier l'utilisateur d'id ${id}. Peut-être que l'utilisateur n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de l'utilisateur d'id ${id} : ${err}.`
            });
        })
}
