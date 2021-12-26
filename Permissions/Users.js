import { User, Shop } from '../Models/Models.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

/* Permissions */
export const scopedUsers = (currentUser, users) => { //Fetch inside findAll controllers
    if (currentUser.roleId === sadmin) return users;
    if (currentUser.roleId === admin) return users.filter(user => user.roleId > admin)
    return users.filter(user => user.id === currentUser.id);
}

const canCreateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin)
    );
}

const canViewUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin) ||
        user.id === currentUser.id
    );
}

const canDeleteUser = (currentUser, user) => {
    return currentUser.roleId === sadmin && currentUser.roleId != sadmin;
}

const canUpdateUser = (currentUser, user) => {
    return (
        currentUser.roleId === sadmin ||
        (currentUser.roleId === admin && user.roleId > admin) ||
        user.id === currentUser.id
    );
}

const userExist = (user) => {
    return User.findOne({ where: { email: user.email } });
}

const shopExist = (user) => {
    return Shop.findByPk(user.shopId);
}
/* Permissions */

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

export const validFormCreateUser = async (req, res, next) => {
    if (await userExist(req.body)) return res.status(401).json({ error: `L'utilisateur existe déjà !` });
    if (req.body.roleId != partner && req.body.shopId) return res.status(401).json({ error: `Pour appartenir à une boutique, il faut être un partenaire !` });
    if (req.body.roleId === partner && !req.body.shopId) return res.status(401).json({ error: `Pour être partnaire, il faut appartenir à une boutique !` });
    if (!await shopExist(req.body)) return res.status(404).json({ error: `La boutique n'existe pas !` });
    next();
}

export const validFormUpdateUser = (req, res, next) => {
    //Taking care that req.user is set so i can edit him as i wish and compared differents values etc...
    next();
}
/* Middlewares */