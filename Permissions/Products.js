import { v4 as uuidv4 } from 'uuid';

import { Product, Shop } from '../Models/Models.js';

import { canCreateProduct, canDeleteProduct, canUpdateProduct } from '../Validations/Products.js';
import {  } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const setProduct = async (req, res, next) => { // For id's parameters routes to set the ticket values from DB
    if (req.currentUser.roleId === sadmin || req.currentUser.roleId === admin) { // If sadmin / admin can see deleted ones
        req.product = await Shop.findOne({where: {id: req.params.id}});
    } else { // Else show only not deleted ones
        req.product = await Shop.findOne({where: {id: req.params.id, deleted: false}});
    }
    if (!req.product) return res.status(404).json({ error: `Le produit n'existe pas !` });
    req.product.dataValues.shop = await Shop.findByPk(req.product.shopId);
    if (!req.ticket.dataValues.user) return res.status(404).json({ error: `La boutique affiliée à ce produit n'existe pas !` });
    next();
}

export const authCreateProduct = (req, res, next) => {
    if (!canCreateProduct(req.currentUser, req.body)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à créer un produit !` });
    next();
}

export const authDeleteProduct = (req, res, next) => {
    if (!canDeleteProduct(req.currentUser, req.product)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à supprimer ce produit !` });
    req.product = {
        deleted: true
    }
    next();
}

export const authUpdateProduct = (req, res, next) => {
    if (!canUpdateProduct(req.currentUser, req.product)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à modifier ce produit !` });
    next();
}

export const validFormCreateProduct = async (req, res, next) => {
    const path = req.files.image.name; // Gérer sauvegarde et route
    req.product = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.price,
        path: path,
        deleted: false,
        shopId: req.currentUser.shopId
    }
    next();
}

export const validFormUpdateProduct = async (req, res, next) => {
    if (req.files.image) {
        req.product.path = req.files.image.name;
    }
    next();
}
