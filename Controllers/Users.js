import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { User, Shop } from '../Models/Models.js';
import { mkUser, rmUser } from '../Middlewares/FileSystem.js';

export const findAllUsers = (req, res) => {
    User.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche d'utilisateurs.`
            });
        });
}

export const createUser = async (req, res) => {

    if (!req.body.lastname || !req.body.firstname || !req.body.email || !req.body.password || !req.body.roleId) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }

    if (req.body.roleId == 3 && !req.body.shopId) return res.status(400).json({
        error: `Un partenaire doit appartenir à une boutique.`
    });

    if (req.body.roleId != 3 && req.body.shopId) return res.status(400).json({
        error: `Seul un partenaire peut appartenir à une boutique.`
    });

    const userExist = await User.findOne({ where: { email: req.body.email } })
    if (userExist) return res.status(400).json({
        error: `L'email ${req.body.email} est déjà utilisée.`
    });

    const shopExist = await Shop.findByPk(req.body.shopId)
    if (!shopExist && req.body.roleId == 3) return res.status(400).json({
        error: `La boutique n'existe pas.`
    });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
        id: uuidv4(),
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId,
        shopId: req.body.shopId
    }

    User.create(user)
        .then(data => {
            mkUser(user.id);
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
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    error: `L'utilisateur n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de l'utilisateur.`
            });
        });
}

export const deleteUser = (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                rmUser(req.params.id);
                res.status(200).json({
                    success: `L'utilisateur a bien été supprimé.`
                });
            } else {
                res.json({
                    error: `Impossible de supprimer l'utilisateur. Peut-être que l'utilisateur n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de l'utilisateur.`
            });
        });
}

export const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    User.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    success: `L'utilisateur a bien été modifié`
                });
            } else {
                res.json({
                    error: `Impossible de modifier l'utilisateur. Peut-être que l'utilisateur n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de l'utilisateur.`
            });
        })
}