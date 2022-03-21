import { User } from '../Models/Models.js';
import { scopedUsers } from '../Permissions/Users.js';
import { mkUser, writeUser, rmUser } from '../Scripts/FileSystems.js';
import { createdUser, deletedUser } from '../Scripts/NodeMailer.js';

export const findAllUsers = async (req, res) => {
    let data = await User.findAll();
    scopedUsers(req.currentUser, data)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la récupération des utilisateurs.`
            });
        });
}

export const createUser = (req, res) => {
    User.create(req.body)
        .then(data => {
            mkUser(req.body.id);
            createdUser(req.body, req.password);
            res.status(200).json({
                success: `Le compte a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de l'utilisateur.`
            });
        });
}

export const findOneUser = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (err) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la recherche de l'utilisateur.`
        });
    }
}

export const deleteUser = (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then(data => {
            rmUser(req.params.id);
            deletedUser(req.user);
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
    User.update(req.body, { where: { id: req.params.id } })
        .then(data => {
            if (req.files) {
                writeUser(req.params.id, req.files.photo);
            }
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