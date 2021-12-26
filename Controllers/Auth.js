import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../Models/Models.js';

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

    if (user.roleId != "4") return res.status(400).json({ error: `Vous ne pouvez que vous connecter avec un compte client, utilisez notre site web !` });

    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPassword) return res.status(400).json({ error: `Mot de passe incorrect.` });

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    res.header('token', token).json({ token: token, user });
}