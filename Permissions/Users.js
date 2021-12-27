import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { User } from '../Models/Models.js';

import { emailExist, shopExist, roleExist } from '../Validations/Exists.js';
import { canViewUser, canCreateUser, canDeleteUser, canUpdateUser } from '../Validations/Users.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedUsers = (currentUser, users) => { //Fetch inside findAll controllers
    if (currentUser.roleId === sadmin) return users;
    if (currentUser.roleId === admin) return users.filter(user => user.roleId > admin)
    return users.filter(user => user.id === currentUser.id);
}

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
    if (!req.body.lastname || !req.body.firstname || !req.body.email || !req.body.password || !req.body.roleId) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (await emailExist(req.body.email)) return res.status(401).json({ error: `L'email est déjà prise !` });
    if (req.body.roleId != partner && req.body.shopId) return res.status(401).json({ error: `Pour appartenir à une boutique, il faut être un partenaire !` });
    if (req.body.roleId === partner && !req.body.shopId) return res.status(401).json({ error: `Pour être partnaire, il faut appartenir à une boutique !` });
    if (!await roleExist(req.body.roleId)) return res.status(404).json({ error: `Le role n'existe pas` });
    if (req.body.shopId) {
        if (!await shopExist(req.body.shopId)) return res.status(404).json({ error: `La boutique n'existe pas !` });
    }
    //Vérification de l'email valide et du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.user = {
        id: uuidv4(),
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId,
        shopId: req.body.shopId
    }
    next();
}

export const validFormUpdateUser = async (req, res, next) => {
    //Vérification de l'email valide et du mot de passe
    // Peut-être faire aussi le changement de mot de passe en recevant un newPass et un actualPass, vérifier que le actualPass soit bon puis changer
    if (req.currentUser.id === req.user.id) req.user.password = await bcrypt.hash(req.body.password, 10)
    else if (req.currentUser.roleId < partner) {
        req.user.lastname = req.body.lastname;
        req.user.firstname = req.body.firstname;
        req.user.email = req.body.email;
    } else {
        return res.status(401).json({ error: `Retournez un formulaire valide` });
    }
    next();
}