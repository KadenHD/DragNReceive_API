import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { WebToken } from '../Models/Models.js';
import { extractBearerToken } from '../Permissions/TokenJWT.js';
import { User } from '../Models/Models.js';
import { resetUser } from '../Scripts/NodeMailer.js';

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
        .then(data => {
            const link = `http://${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}/reset/${req.body.userId}/${req.body.token}`;
            resetUser(req.user, link)
                .then(data => {
                    res.status(200).json({
                        success: `Le token a bien été envoyé.`
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: `Une erreur est survenue lors de l'envoi du mail.`
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du token.`
            });
        });
}

export const updateResetUser = async (req, res) => { // Modifier et enlever le async
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}