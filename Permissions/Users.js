import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { User, Shop } from '../Models/Models.js';

import { emailExist, shopExist, roleExist } from '../Validations/Exists.js';
import { canViewUser, canCreateUser, canDeleteUser, canUpdateUser } from '../Validations/Users.js';
import { isValidEmail, isValidFirstName, isValidLastName, isValidPassword, isValidPhoto } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedUsers = async (currentUser, users) => { // Fecth inside FindAllUsers Controller
    for (let i = 0; i < users.length; i++) {
        if (users[i].shopId) {
            const shop = await Shop.findByPk(users[i].shopId); // Add shop inside users
            users[i].dataValues.shop = shop.dataValues;
        }
    }
    if (currentUser.roleId === sadmin) return users;
    if (currentUser.roleId === admin) return users.filter(user => user.roleId === partner || user.roleId === client || user.id === currentUser.id) // Return Partner Client and himself
    if (currentUser.roleId === partner) return users.filter(user => user.shopId === currentUser.shopId || user.id === currentUser.id)
    return users.filter(user => user.id === currentUser.id); // Return only himself
}

export const setUser = async (req, res, next) => { // For :id's routes, set the User with his contents
    req.user = await User.findByPk(req.params.id);
    if (!req.user) return res.status(404).json({ error: `L'utilisateur n'existe pas !` });
    if (req.currentUser.roleId === partner) { // If partner store shop
        req.user.dataValues.shop = await Shop.findByPk(req.user.shopId);
    }
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
    /* Check exists and validities */
    if (!req.body.lastname || !req.body.firstname || !req.body.email || !req.body.password || !req.body.roleId) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (await emailExist(req.body.email)) return res.status(401).json({ error: `L'email est déjà prise !` });
    if (req.body.roleId != partner && req.body.shopId) return res.status(401).json({ error: `Pour appartenir à une boutique, il faut être un partenaire !` }); // If shop but no partner
    if (req.body.roleId === partner && !req.body.shopId) return res.status(401).json({ error: `Pour être partnaire, il faut appartenir à une boutique !` }); // If partner but no shop
    if (!await roleExist(req.body.roleId)) return res.status(404).json({ error: `Le role n'existe pas` }); // If role not exist
    if (req.body.shopId) if (!await shopExist(req.body.shopId)) return res.status(404).json({ error: `La boutique n'existe pas !` }); // If shop not exist
    /* Check valids formats */
    if (!isValidLastName(req.body.lastname)) return res.status(401).json({ error: `Format de nom non-valide !` });
    if (!isValidFirstName(req.body.firstname)) return res.status(401).json({ error: `Format de prénom non-valide !` });
    if (!isValidEmail(req.body.email)) return res.status(401).json({ error: `Format d'email non-valide !` });
    if (!isValidPassword(req.body.password)) return res.status(401).json({ error: `Format de mot de passe non-valide !` });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body = {
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
    if (req.currentUser.id === req.user.id && req.body.newPassword && req.body.actualPassword) { // If its own modification can update password only
        const passwordSimilar = (data, hash) => { return bcrypt.compareSync(data, hash); };
        if (!isValidPassword(req.body.newPassword)) return res.status(401).json({ error: `Format de mot de passe non-valide !` });
        if (!passwordSimilar(req.body.actualPassword, req.user.password)) return res.status(401).json({ error: `Le mot de passe n'est pas correct !` }); // Check if actual password is the same as db
        if (passwordSimilar(req.body.newPassword, req.user.password)) return res.status(401).json({ error: `Le nouveau mot de passe doit être différent de l'ancien !` }); // Check if new password is != as db
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        req.user.password = hashedPassword;
    } else if (req.currentUser.roleId < partner && req.body.lastname && req.body.firstname && req.body.email) { // If its modification made by Admin or SuperAdmin can update last and first name and email only
        if (!isValidLastName(req.body.lastname)) return res.status(401).json({ error: `Format de nom non-valide !` });
        if (!isValidFirstName(req.body.firstname)) return res.status(401).json({ error: `Format de prénom non-valide !` });
        if (!isValidEmail(req.body.email)) return res.status(401).json({ error: `Format d'email non-valide !` });
        if (await emailExist(req.body.email) && req.body.email != req.user.email) return res.status(401).json({ error: `L'email est déjà prise !` });
        req.user.lastname = req.body.lastname;
        req.user.firstname = req.body.firstname;
        req.user.email = req.body.email;
    } else if (req.currentUser.id == req.user.id && req.files) { // only own modification for image
        if (!isValidPhoto(req.files.photo)) return res.status(401).json({ error: `Format de fichier non-valide !` });
        req.user.path = '/Users/' + req.params.id + '/Photo/' + req.files.photo.name;
    } else {
        return res.status(401).json({ error: `Retournez un formulaire valide !` });
    }
    req.body = req.user.dataValues;
    next();
}
