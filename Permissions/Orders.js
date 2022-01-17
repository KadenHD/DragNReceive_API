import { v4 as uuidv4 } from 'uuid';

import { Order, Product } from '../Models/Models.js';

import { } from '../Validations/Exists.js';
import { canViewOrder, canCreateOrder, canUpdateOrder } from '../Validations/Orders.js';
import { } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedOrders = (currentUser, orders) => { // Fetch inside findAllUsers controller
    // Return all pour sadmin et admin
    // Return pour les partenaires seulement les orders ayant le shopId
    // Return seulement ceux que les clients possèdent
}

export const setOrder = async (req, res, next) => { // For id's parameters routes to set the order values from DB
    req.order = await Order.findByPk(req.params.id);
    if (!req.order) return res.status(404).json({ error: `La commande n'existe pas !` });
    req.orders = await Order.findAll({ where: { number: req.order.number } });
    if (!req.orders) return res.status(404).json({ error: `La commande n'existe pas !` });
    for (let i = 0; i < req.orders.length; i++) {
        req.orders[i].dataValues.product = await Product.findByPk(req.orders[i].productId);
    }
}

export const authCreateOrder = (req, res, next) => {
    if (!canCreateOrder(req.currentUser, req.body)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à créer une commande !` });
    next();
}

export const authGetOrder = (req, res, next) => {
    if (!canViewOrder(req.currentUser, req.order)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à voir cette commande !` });
    next();
}

export const authUpdateOrder = (req, res, next) => {
    if (!canUpdateOrder(req.currentUser, req.order)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à modifier cette commande !` });
    next();
}

export const validFormCreateOrder = async (req, res, next) => {
    for (let i = 0; i < req.body.orders.length; i++) {
        if (req.body.orders[i].product.stock < quantities) return res.status(401).json({ error: `Il n'y a pas assez de stocks !` });; //boucle for de vérification
        // Product exist et not deleted
        // format valids
    }
    next();
}

export const validFormUpdateOrder = async (req, res, next) => {
    //Format, exist and validities
    next();
}
