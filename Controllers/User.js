import { User } from '../Models/Models.js';

import { scopedUsers } from '../Permissions/Users.js';
import { mkUser, rmUser } from '../Middlewares/FileSystem.js';

export const findAllUsers = (req, res) => {
    User.findAll()
        .then(data => {
            data = scopedUsers(req.currentUser, data); //fetch
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche d'utilisateurs.`
            });
        });
}

export const createUser = (req, res) => {
    User.create(req.user)
        .then(data => {
            mkUser(req.user.id);
            res.status(200).json({
                success: `L'utilisateur a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de l'utilisateur.`
            });
        });
}

export const findOneUser = (req, res) => {
    User.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de l'utilisateur.`
            });
        });
}

export const deleteUser = (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then(data => {
            rmUser(req.params.id);
            res.status(200).json({
                success: `L'utilisateur a bien été supprimé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de l'utilisateur.`
            });
        });
}

export const updateUser = (req, res) => {
    User.update(req.user, { where: { id: req.params.id } })
        .then(data => {
            res.status(200).json({
                success: `L'utilisateur a bien été modifié`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de l'utilisateur.`
            });
        })
}