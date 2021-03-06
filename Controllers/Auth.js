import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, WebToken, MobileCode } from '../Models/Models.js';
import { extractBearerToken } from '../Permissions/TokenJWT.js';
import { resetedUser, updateResetedUser, resetedClient, updateResetedClient } from '../Scripts/NodeMailer.js';

export const loginUser = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ error: `Email introuvable.` });
    if (user.roleId === "4") return res.status(400).json({ error: `Vous ne pouvez pas vous connecter avec un compte client, utilisez notre application mobile !` });
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPassword) return res.status(400).json({ error: `Mot de passe incorrect.` });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    res.header('token', token).json({ token: token, user });
}

export const loginClient = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ error: `Email introuvable.` });
    if (user.roleId != "4") return res.status(400).json({ error: `Vous ne pouvez pas vous connecter avec un compte partenaire ou administrateur, utilisez notre site web !` });
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPassword) return res.status(400).json({ error: `Mot de passe incorrect.` });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    res.header('token', token).json({ token: token, user });
}

export const getCurrentUser = async (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
    if (!token) return res.status(200).json({ currentUser: null });
    try {
        req.currentUser = jwt.verify(token, process.env.SECRET_TOKEN);
        req.currentUser = await User.findByPk(req.currentUser.id); /* For all request who need to be logged in, put the current user inside the request */
        return res.status(200).json({ currentUser: req.currentUser });
    } catch (error) {
        return res.status(200).json({ currentUser: null });
    }
}

export const createForgotUser = (req, res) => {
    WebToken.create(req.body)
        .then(() => {
            const link = `http://${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/reset/${req.body.userId}/${req.body.token}`;
            resetedUser(req.user, link);
            res.status(200).json({
                success: `Le token a bien ??t?? envoy??.`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la cr??ation du token.`
            });
        });
}

export const updateResetUser = (req, res) => {
    User.update(req.body, { where: { id: req.user.id } })
        .then(() => {
            WebToken.destroy({ where: { token: req.token.token } })
                .then(() => {
                    updateResetedUser(req.user);
                    res.status(200).json({
                        success: `La r??initialisation de mot de passe a bien ??t?? effectu?? !`
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        error: `Une erreur est survenue lors de la destruction du token.`
                    });
                });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la modification de l'utilisateur.`
            });
        });
}

export const createForgotClient = (req, res) => {
    MobileCode.create(req.body)
        .then(() => {
            const code = req.body.code;
            resetedClient(req.user, code);
            res.status(200).json({
                id: req.body.id,
                userId: req.body.userId,
                success: `Le code a bien ??t?? envoy??.`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la cr??ation du code.`
            });
        });
}

export const updateResetClient = (req, res) => {
    User.update(req.body, { where: { id: req.user.id } })
        .then(() => {
            MobileCode.destroy({ where: { code: req.code.code } })
                .then(() => {
                    updateResetedClient(req.user);
                    res.status(200).json({
                        success: `La r??initialisation de mot de passe a bien ??t?? effectu?? !`
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        error: `Une erreur est survenue lors de la destruction du code.`
                    });
                });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la modification de l'utilisateur.`
            });
        });
}