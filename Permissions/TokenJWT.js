import jwt from 'jsonwebtoken';

import { User } from '../Models/Models.js';

export const isValidToken = async (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
    if (!token) return res.status(401).json({ error: `Vous avez besoin d'un token.` });
    try {
        req.currentUser = jwt.verify(token, process.env.SECRET_TOKEN);
        req.currentUser = await User.findByPk(req.currentUser.id); /* For all request who need to be logged in, put the current user inside the request */
        next();
    } catch (error) {
        return res.status(400).json({ error: `Le token n'est pas valide.` });
    }
}

export const extractBearerToken = (headerValue) => {
    if (typeof headerValue != 'string') return false;
    const matches = headerValue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
}