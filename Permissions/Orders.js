import { Order, Product } from '../Models/Models.js';

import { canViewOrder, canCreateOrder, canUpdateOrder } from '../Validations/Orders.js';
import { isValidPrice, isValidQuantities } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

const validate = "1";
const inProgress = "2";
const available = "3";
const collected = "4";
const canceled = "5";

export const scopedOrders = async (currentUser, orders) => { /* Fetch inside findAllUsers controller */
    for (let i = 0; i < orders.length; i++) {
        orders[i].product = await Product.findByPk(orders[i].productId);
    }
    if (currentUser.roleId === sadmin || currentUser.roleId === admin) return orders;
    if (currentUser.roleId === partner) return orders.filter(order => order.product.shopId === currentUser.shopId);
    return orders.filter(order => order.userId === currentUser.id);
}

export const setOrder = async (req, res, next) => { /* For id's parameters routes to set the order values from DB */
    req.order = await Order.findByPk(req.params.id);
    if (!req.order) return res.status(404).json({ error: `La commande n'existe pas !` });
    req.orders = await Order.findAll({ where: { number: req.order.number } });
    if (!req.orders) return res.status(404).json({ error: `La commande n'existe pas !` });
    for (let i = 0; i < req.orders.length; i++) {
        req.orders[i].dataValues.product = await Product.findByPk(req.orders[i].productId);
    }
}

export const authCreateOrder = (req, res, next) => {
    if (!canCreateOrder(req.currentUser, req.body)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à créer une commande !` });
    next();
}

export const authGetOrder = (req, res, next) => {
    if (!canViewOrder(req.currentUser, req.order)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à voir cette commande !` });
    next();
}

export const authUpdateOrder = async (req, res, next) => {
    for (let i = 0; i < req.body.orders.length; i++) {
        const product = await Product.findByPk(req.body.orders[i].productId);
        if (!canUpdateOrder(req.currentUser, req.body.orders[i], product)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à modifier cette commande !` });
    }
    next();
}

export const validFormCreateOrder = async (req, res, next) => {
    for (let i = 0; i < req.body.orders.length; i++) {
        const { quantities, price, productId } = req.body.orders[i];
        if (!quantities, !price, !productId) return res.status(403).json({ error: `Le formulaire n'est pas bon !` });
        req.body.orders[i].product = await Product.findByPk(productId);
        if (!req.body.orders[i].product) return res.status(404).json({ error: `Le produit n'existe pas` });
        if (req.body.orders[i].product.stock < quantities) return res.status(403).json({ error: `Il n'y a pas assez de stocks !` });;
        if (!isValidQuantities) return res.status(403).json({ error: `Format de quantités non-valide !` });
        if (!isValidPrice) return res.status(403).json({ error: `Format de prix non-valide !` });
    }
    next();
}

export const validFormUpdateOrder = async (req, res, next) => {
    for (let i = 0; i < req.body.orders.length; i++) {
        const product = await Product.findByPk(req.body.orders[i].productId);
        const order = await Order.findByPk(req.body.orders[i].id);
        if (req.body.orders[i].orderStatusId === inProgress && req.currentUser.roleId === partner && req.currentUser.shopId === product.shopId && order.orderStatusId === validate) {
            req.body.orders[i] = { id: req.body.orders[i].id, orderStatusId: inProgress }
        }
        else if (req.body.orders[i].orderStatusId === available && req.currentUser.roleId === partner && req.currentUser.shopId === product.shopId && order.orderStatusId === inProgress) {
            req.body.orders[i] = { id: req.body.orders[i].id, orderStatusId: available }
        }
        else if (req.body.orders[i].orderStatusId === collected && req.currentUser.roleId === partner && req.currentUser.shopId === product.shopId && order.orderStatusId === available) {
            req.body.orders[i] = { id: req.body.orders[i].id, orderStatusId: collected }
        }
        else if (req.body.orders[i].orderStatusId === canceled && req.currentUser.roleId === client && currentUser.id === order.userId && order.orderStatusId === validate) {
            req.body.orders[i] = { id: req.body.orders[i].id, orderStatusId: canceled }
        }
        else return res.status(403).json({ error: `Vous ne pouvez pas modifier cette commande !` });
    }
    next();
}
