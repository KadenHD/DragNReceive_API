import { v4 as uuidv4 } from 'uuid';

import { Shop, Product } from '../Models/Models.js';

import { canCreateShop, canViewShop, canDeleteShop, canUpdateShop } from '../Validations/Shops.js';
import {  } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

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

    // Check valids format values

    req.shop = {
        id: uuidv4(),
    }
    next();
}

export const validFormUpdateShop = async (req, res, next) => {
    //Format, exist and validities
    next();
}
