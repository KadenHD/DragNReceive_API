import { User } from '../Models/Models.js';

//token = user from the token header, just receive the value
export const scopedUsers = (token, users) => { // faudra mettre cette fonction dans le findAllUsers => res.json(scopedUsers(token, users)) à peu près
    if (token.role === 1 || token.role === 2) return users;
    return users.filter(user => user.id === token.id);
}

// Elles ne se font appelé uniquement dans les middlewares de authUser
export const canCreateUser = (token, user) => {
    return (
        token.role === 1 ||
        (token.role === 2 && user.id != 1 && user.id != 2)
    );
}

export const canViewUser = (token, user) => {
    return (
        token.role === 1 ||
        (token.role === 2 && user.id != 1 && user.id != 2) ||
        user.id === token.id
    );
}

export const canDeleteUser = (token, user) => {
    return token.role === 1;
}

export const canUpdateUser = (token, user) => {
    return (
        token.role === 1 ||
        (token.role === 2 && user.id != 1 && user.id != 2) ||
        user.id === token.id
    );
}


/////// Normalement ce qu'il y a en dessous doit aller dans le router ///////

export const setUser = (req, res, next) => {
    const user = User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            error: `L'utilisateur n'existe pas !`
        });
    }
    next();
}

export const authCreateUser = (req, res, next) => {
    if (!canCreateUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à créer un utilisateur !`
    });
    next();
}

export const authGetUser = (req, res, next) => {
    if (!canViewUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à voir cet utilisateur !`
    });
    next();
}

export const authDeleteUser = (req, res, next) => {
    if (!canDeleteUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à supprimer cet utilisateur !`
    });
    next();
}

export const authUpdateUser = (req, res, next) => {
    if (!canUpdateUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à modifier cet utilisateur !`
    });
    next();
}
