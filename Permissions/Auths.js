import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { User, WebToken } from '../Models/Models.js';
import { isValidEmail, isValidPassword } from "../Validations/Formats.js";

export const authRegisterClient = async (req, res, next) => {
    if (req.body.roleId != "4") return res.status(403).json({ error: `Seul des clients peuvent s'inscrire !` });
    next();
}

export const validForgotUser = async (req, res, next) => {
    if (!req.body.email) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (!isValidEmail(req.body.email)) return res.status(403).json({ error: `Format d'email non-valide !` });

    req.user = await User.findOne({ where: { email: req.body.email } });
    if (!req.user) return res.status(403).json({ error: `L'utilisateur n'existe pas !` });
    if (req.user && req.user.roleId == "4") return res.status(403).json({ error: `Les clients ne peuvent pas faire cette demande !` });

    req.token = await WebToken.findOne({ where: { userId: req.user.id } });
    if (req.token) {
        let expiracy = new Date(req.token.createdAt.setHours(req.token.createdAt.getHours() + 1));
        if (expiracy < new Date()) {
            WebToken.destroy({ where: { userId: req.user.id } })
                .then(data => {
                    const token = faker.datatype.hexaDecimal(32);
                    req.body = {
                        id: uuidv4(),
                        userId: req.user.id,
                        token: token
                    }
                    next();
                })
                .catch(err => {
                    return res.status(500).json({ error: `Une erreur est survenue lors de la suppression du token expiré !` });
                });
        } else {
            return res.status(403).json({ error: `Vous avez déjà reçu un email contenant un token valide !` });
        }
    } else {
        const token = faker.datatype.hexaDecimal(32);
        req.body = {
            id: uuidv4(),
            userId: req.user.id,
            token: token
        }
        next();
    }
}

export const validResetUser = async (req, res, next) => {
    if (!req.body.password) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (!isValidPassword(req.body.password)) return res.status(403).json({ error: `Format de mot de passe non-valide !` });

    req.user = await User.findByPk(req.params.userId);
    if (!req.user) return res.status(403).json({ error: `Le lien est invalide ou a expiré !` });
    if (req.user && req.user.roleId == "4") return res.status(403).json({ error: `Les clients ne peuvent pas faire cette demande !` });

    req.token = await WebToken.findOne({ where: { userId: req.user.id, token: req.params.token, } });
    if (!req.token) return res.status(403).json({ error: `Le lien est invalide ou a expiré !` });

    let expiracy = new Date(req.token.createdAt.setHours(req.token.createdAt.getHours() + 1));
    if (expiracy < new Date()) { return res.status(403).json({ error: `Le lien est invalide ou a expiré !` }); }
    else {
        req.user.password = await bcrypt.hash(req.body.password, 10);
        req.body = req.user.dataValues;
        next();
    }
}