import { v4 as uuidv4 } from 'uuid';

import { Shop, Product } from '../Models/Models.js';

import { emailExist, nameExist, phoneExist } from '../Validations/Exists.js';
import { canCreateShop, canViewShop, canDeleteShop, canUpdateShop } from '../Validations/Shops.js';
import { isValidEmail, isValidName, isValidPhone, isValidCity, isValidStreet, isValidPostal, isValidLogo } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedShops = async (currentUser, shops) => { /* Fetch inside findAllShops controller */
    for (let i = 0; i < shops.length; i++) { /* Stock in each shops their products. */
        if (currentUser.roleId === sadmin || currentUser.roleId === admin) { /* If sadmin / admin can see deleted ones */
            shops[i].dataValues.products = await Product.findAll({ where: { shopId: shops[i].id } });
        } else { /* Else show only not deleted ones */
            shops[i].dataValues.products = await Product.findAll({ where: { shopId: shops[i].id, deleted: false } });
        }
    }
    if (currentUser.roleId === sadmin || currentUser.roleId === admin) return shops; /* If Super Admin or admin return all shops */
    return shops.filter(shop => shop.deleted === false); /* Else return only not deleted shops */
}

export const setShop = async (req, res, next) => { /* For id's parameters routes to set the shop values from DB */
    if (req.currentUser.roleId === sadmin || req.currentUser.roleId === admin) { /* If sadmin / admin can see deleted ones */
        req.shop = await Shop.findOne({ where: { id: req.params.id } });
    } else { /* Else show only not deleted ones */
        req.shop = await Shop.findOne({ where: { id: req.params.id, deleted: false } });
    }
    if (!req.shop) return res.status(404).json({ error: `La boutique n'existe pas !` });
    if (req.currentUser.roleId === sadmin || req.currentUser.roleId === admin) { /* If sadmin / admin can see deleted ones */
        req.shop.dataValues.products = await Product.findAll({ where: { shopId: req.shop.id } });
    } else { /* Else show only not deleted ones */
        req.shop.dataValues.products = await Product.findAll({ where: { shopId: req.shop.id, deleted: false } });
    }
    next();
}

export const authCreateShop = (req, res, next) => {
    if (!canCreateShop(req.currentUser, req.body)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à créer une boutique !` });
    next();
}

export const authGetShop = async (req, res, next) => {
    if (!canViewShop(req.currentUser, req.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à voir cette boutique !` });
    next();
}

export const authDeleteShop = (req, res, next) => {
    if (!canDeleteShop(req.currentUser, req.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à supprimer cette boutique !` });
    if (req.shop.deleted) return res.status(403).json({ error: `La boutique a déjà été supprimée !` });
    req.body = { deleted: true };
    next();
}

export const authUpdateShop = (req, res, next) => {
    if (!canUpdateShop(req.currentUser, req.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à modifier cette boutique !` });
    next();
}

export const validFormCreateShop = async (req, res, next) => {
    /* Check exists and validities */
    if (!req.body.email || !req.body.name) return res.status(403).json({ error: `Le formulaire n'est pas bon !` });
    if (await emailExist(req.body.email)) return res.status(403).json({ error: `L'email est déjà prise !` });
    if (await nameExist(req.body.name)) return res.status(403).json({ error: `Le nom est déjà pris !` });
    /* Check valids formats */
    if (!isValidEmail(req.body.email)) return res.status(403).json({ error: `Format d'email non-valide !` });
    if (!isValidName(req.body.name)) return res.status(403).json({ error: `Format de nom non-valide !` });
    req.body = {
        id: uuidv4(),
        email: req.body.email,
        name: req.body.name,
        deleted: false
    }
    next();
}

export const validFormUpdateShop = async (req, res, next) => {
    if ((!req.body.email || !req.body.name) && !req.body.phone && !req.body.city && !req.body.street && !req.body.postal) return res.status(403).json({ error: `Le formulaire n'est pas bon !` });
    if ((req.body.email == req.shop.email) && (req.body.name == req.shop.name) && (req.body.phone == req.shop.phone) && (req.body.city == req.shop.city) && (req.body.street == req.shop.street) && (req.body.postal == req.shop.postal) && (!req.files)) return res.status(401).json({ error: `Vous n'avez pas modifiée la boutique !` });
    if (req.body.email != req.shop.email) {
        if (await emailExist(req.body.email)) return res.status(403).json({ error: `L'email est déjà prise !` });
        if (!isValidEmail(req.body.email)) return res.status(403).json({ error: `Format d'email non-valide !` });
        req.shop.email = req.body.email;
    }
    if (req.body.name != req.shop.name) {
        if (await nameExist(req.body.name)) return res.status(403).json({ error: `Le nom est déjà pris !` });
        if (!isValidName(req.body.name)) return res.status(403).json({ error: `Format de nom non-valide !` });
        req.shop.name = req.body.name;
    }
    if (req.body.phone != req.shop.phone) {
        if (await phoneExist(req.body.phone)) return res.status(403).json({ error: `Le numéro est déjà pris !` });
        if (!isValidPhone(req.body.phone)) return res.status(403).json({ error: `Format de téléphone non-valide !` });
        req.shop.phone = req.body.phone;
    }
    if (req.body.city != req.shop.city) {
        if (!isValidCity(req.body.city)) return res.status(403).json({ error: `Format de ville non-valide !` });
        req.shop.city = req.body.city;
    }
    if (req.body.street != req.shop.street) {
        if (!isValidStreet(req.body.street)) return res.status(403).json({ error: `Format de rue non-valide !` });
        req.shop.street = req.body.street;
    }
    if (req.body.postal != req.shop.postal) {
        if (!isValidPostal(req.body.postal)) return res.status(403).json({ error: `Format de code postal non-valide !` });
        req.shop.postal = req.body.postal;
    }
    if (req.files) { /* Voir comment vérifier les logos */
        if (!isValidLogo(req.files.logo)) return res.status(403).json({ error: `Format de fichier non-valide !` });
        req.shop.path = '/Companies/' + req.params.id + '/Logo/' + req.files.logo.name;
    }
    req.body = req.shop.dataValues; /* Store the new values */
    next();
}