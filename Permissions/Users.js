import { User } from '../Models/Models.js';

const sadmin = "1";
const admin = "2";

/* Roles permissions */
export const scopedUsers = (currentUser, users) => { //Fetch inside findAll controllers
    if (currentUser.roleId === sadmin) return users;
    if (currentUser.roleId === admin) return users.filter(user => user.roleId > admin)
    return users.filter(user => user.id === currentUser.id);
}

export const canCreateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin)
    );
}

export const canViewUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin) ||
        user.id === currentUser.id
    );
}

export const canDeleteUser = (currentUser, user) => {
    return currentUser.roleId === sadmin && currentUser.roleId != sadmin;
}

export const canUpdateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin) ||
        user.id === currentUser.id
    );
}
/* Roles permissions */

/* Middlewares */
export const setUser = async (req, res, next) => { // For id's parameters routes
    req.user = await User.findByPk(req.params.id);
    if (!req.user) return res.status(404).json({ error: `L'utilisateur n'existe pas !` });
    next();
}

export const authCreateUser = (req, res, next) => {
    if (!canCreateUser(req.currentUser, req.body)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à créer un utilisateur !` });
    next();
}

export const authGetUser = (req, res, next) => {
    if (!canViewUser(req.currentUser, req.user)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à voir cet utilisateur !` });
    next();
}

export const authDeleteUser = (req, res, next) => {
    if (!canDeleteUser(req.currentUser, req.user)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à supprimer cet utilisateur !` });
    next();
}

export const authUpdateUser = (req, res, next) => {
    if (!canUpdateUser(req.currentUser, req.user)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à modifier cet utilisateur !` });
    next();
}

export const validFormCreateUser = (req, res, next) => {
    next();
}

export const validFormUpdateUser = (req, res, next) => {
    next();
}
/* Middlewares */