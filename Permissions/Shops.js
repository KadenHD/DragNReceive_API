import { v4 as uuidv4 } from 'uuid';

import { Shop, Product } from '../Models/Models.js';

import { emailExist, nameExist, phoneExist } from '../Validations/Exists.js';
import { canCreateShop, canViewShop, canDeleteShop, canUpdateShop } from '../Validations/Shops.js';
import { isValidEmail, isValidName, isValidPhone, isValidCity, isValidStreet, isValidPostal } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedShops = (currentUser, shops) => { // Fetch inside findAllShops controller
    if (currentUser.roleId === sadmin || currentUser.roleId === admin) return shops; // If Super Admin or admin return all shops
    return shops.filter(shop => shop.deleted === false); // Else return only not deleted shops
}

export const setShop = async (req, res, next) => { // For id's parameters routes to set the shop values from DB
    req.shop = await Shop.findByPk(req.params.id);
    if (!req.shop) return res.status(404).json({ error: `La boutique n'existe pas !` });
    req.shop.dataValues.products = await Product.findAll({ where: { shopId: req.shop.id } });
    next();
}

export const authCreateShop = (req, res, next) => {
    if (!canCreateShop(req.currentUser, req.body)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à créer une boutique !` });
    next();
}

export const authGetShop = (req, res, next) => {
    if (!canViewShop(req.currentUser, req.shop)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à voir cette boutique !` });
    next();
}

export const authDeleteShop = (req, res, next) => {
    if (!canDeleteShop(req.currentUser, req.shop)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à supprimer cette boutique !` });
    next();
}

export const authUpdateShop = (req, res, next) => {
    if (!canUpdateShop(req.currentUser, req.shop)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à modifier cette boutique !` });
    next();
}

export const validFormCreateShop = async (req, res, next) => {
    // Check exists and validities
    if (!req.body.email || !req.body.name) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (await emailExist(req.body.email)) return res.status(401).json({ error: `L'email est déjà prise !` });
    if (await nameExist(req.body.name)) return res.status(401).json({ error: `Le nom est déjà pris !` });
    // Check valids format values
    if (!isValidEmail(req.body.email)) return res.status(401).json({ error: `Format d'email non-valide !` });
    if (!isValidName(req.body.name)) return res.status(401).json({ error: `Format de nom non-valide !` });
    req.shop = {
        id: uuidv4(),
        email: req.body.email,
        name: req.body.name,
        deleted: false
    }
    next();
}

export const validFormUpdateShop = async (req, res, next) => {
    if (!req.body.email && !req.body.name && !req.body.phone && !req.body.city && !req.body.street && !req.body.postal) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (req.body.email) {
        if (await emailExist(req.body.email)) return res.status(401).json({ error: `L'email est déjà prise !` });
        if (!isValidEmail(req.body.email)) return res.status(401).json({ error: `Format d'email non-valide !` });
        req.shop.email = req.body.email;
    }
    if (req.body.name) {
        if (await nameExist(req.body.name)) return res.status(401).json({ error: `Le nom est déjà pris !` });
        if (!isValidName(req.body.name)) return res.status(401).json({ error: `Format de nom non-valide !` });
        req.shop.name = req.body.name;
    }
    if (req.body.phone) {
        if (await phoneExist(req.body.phone)) return res.status(401).json({ error: `Le numéro est déjà pris !` });
        if (!isValidPhone(req.body.phone)) return res.status(401).json({ error: `Format de téléphone non-valide !` });
        req.shop.phone = req.body.phone;
    }
    if (req.body.city) {
        if (!isValidCity(req.body.city)) return res.status(401).json({ error: `Format de ville non-valide !` });
        req.shop.city = req.body.city;
    }
    if (req.body.street) {
        if (!isValidStreet(req.body.street)) return res.status(401).json({ error: `Format de rue non-valide !` });
        req.shop.street = req.body.street;
    }
    if (req.body.postal) {
        if (!isValidPostal(req.body.street)) return res.status(401).json({ error: `Format de code postal non-valide !` });
        req.shop.postal = req.body.postal;
    }
    //traitement d'image à modifier
    let shop = req.body;
    let img = {};
    if (req.files.logo) {
        img = req.files.logo;
        shop.path = img.name;
    }
    next();
}
