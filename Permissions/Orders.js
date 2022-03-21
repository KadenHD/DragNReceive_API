import { Order, Product, User } from '../Models/Models.js';
import { canCreateOrder } from '../Validations/Orders.js';
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
    if (currentUser.roleId === sadmin || currentUser.roleId === admin) {
        let numberTab = [];
        for (let i = 0; i < orders.length; i++) {
            let numberExist = false;
            for (let j = 0; j < numberTab.length; j++) {
                if (orders[i].number === numberTab[j]) {
                    numberExist = true;
                }
            }
            if (!numberExist) {
                numberTab.push(orders[i].number)
            }
        }
        let finalTab = [];
        for (let j = 0; j < numberTab.length; j++) {
            const orders = await Order.findAll({ where: { number: numberTab[j] } })
            const user = await User.findByPk(orders[0].userId);
            let status = orders[0].orderStatusId;
            let price = 0;
            for (let i = 0; i < orders.length; i++) {
                orders[i].dataValues.product = await Product.findByPk(orders[i].productId)
                price += orders[i].price * orders[i].quantities;
                if (status > orders[i].orderStatusId) { status = orders[i].orderStatusId }
            }
            finalTab[j] = { price: price, status: status, orders: orders, user: user, number: orders[0].number };
        }
        return finalTab
    }
    else if (currentUser.roleId === partner) {
        let numberTab = [];
        for (let i = 0; i < orders.length; i++) {
            let numberExist = false;
            for (let j = 0; j < numberTab.length; j++) {
                if (orders[i].number === numberTab[j] && orders[i].shopId === currentUser.shopId) { // is own shop only
                    numberExist = true;
                }
            }
            if (!numberExist) {
                numberTab.push(orders[i].number)
            }
        }
        let finalTab = [];
        for (let j = 0; j < numberTab.length; j++) {
            const orders = await Order.findAll({ where: { number: numberTab[j], shopId: currentUser.shopId } })
            if (orders.length != 0) {
                const user = await User.findByPk(orders[0].userId);
                let status = orders[0].orderStatusId;
                let price = 0;
                for (let i = 0; i < orders.length; i++) {
                    orders[i].dataValues.product = await Product.findByPk(orders[i].productId)
                    price += orders[i].price * orders[i].quantities;
                    if (status > orders[i].orderStatusId) { status = orders[i].orderStatusId }
                }
                finalTab.push({ price: price, status: status, orders: orders, user: user, number: orders[0].number })
            }
        }
        return finalTab
    }
    else if (currentUser.roleId === client) {
        let numberTab = [];
        for (let i = 0; i < orders.length; i++) {
            let numberExist = false;
            for (let j = 0; j < numberTab.length; j++) {
                if (orders[i].number === numberTab[j] && orders[i].userId === currentUser.id) { // is own orders only
                    numberExist = true;
                }
            }
            if (!numberExist) {
                numberTab.push(orders[i].number)
            }
        }
        let finalTab = [];
        for (let j = 0; j < numberTab.length; j++) {
            const orders = await Order.findAll({ where: { number: numberTab[j], userId: currentUser.id } })
            if (orders.length != 0) {
                const user = await User.findByPk(orders[0].userId);
                let status = orders[0].orderStatusId;
                let price = 0;
                for (let i = 0; i < orders.length; i++) {
                    orders[i].dataValues.product = await Product.findByPk(orders[i].productId)
                    price += orders[i].price * orders[i].quantities;
                    if (status > orders[i].orderStatusId) { status = orders[i].orderStatusId }
                }
                finalTab.push({ price: price, status: status, orders: orders, user: user, number: orders[0].number })
            }
        }
        return finalTab
    }
}

export const setOrder = async (req, res, next) => { /* For id's parameters routes to set the order values from DB */
    const orders = await Order.findAll({ where: { number: req.params.number } });
    if (!orders) return res.status(404).json({ error: `La commande n'existe pas !` });
    if (req.currentUser.roleId == sadmin || req.currentUser.roleId == admin) {
        req.orders = orders
    } else if (req.currentUser.roleId == partner) {
        req.orders = orders.filter(order => order.shopId === req.currentUser.shopId)
        if (!req.orders) { return res.status(404).json({ error: `Vous n'êtes pas autorisé à voir cette commande !` }); }
    } else if (req.currentUser.roleId == client) {
        if (orders[0].userId === req.currentUser.id) { req.orders = orders }
        else { return res.status(404).json({ error: `Vous n'êtes pas autorisé à voir cette commande !` }); }
    } else {
        return res.status(404).json({ error: `Vous n'êtes pas autorisé à voir cette commande !` });
    }
    const user = await User.findByPk(orders[0].userId);
    let status = orders[0].orderStatusId;
    let price = 0;
    for (let i = 0; i < req.orders.length; i++) {
        req.orders[i].dataValues.user = user;
        req.orders[i].dataValues.product = await Product.findByPk(orders[i].productId)
        price += req.orders[i].price * req.orders[i].quantities;
        if (status > req.orders[i].orderStatusId) { status = req.orders[i].orderStatusId }
    }
    next();
}

export const authCreateOrder = (req, res, next) => {
    if (!canCreateOrder(req.currentUser, req.body)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à créer une commande !` });
    next();
}

export const validFormCreateOrder = async (req, res, next) => {
    for (let i = 0; i < req.body.orders.length; i++) {
        const { quantities, price, productId } = req.body.orders[i];
        if (!quantities || !price || !productId) return res.status(403).json({ error: `Le formulaire n'est pas bon !` }); // Risque de modifier, ne pas recevoir le prix et le définir ici
        req.body.orders[i].product = await Product.findByPk(productId);
        if (!req.body.orders[i].product) return res.status(404).json({ error: `Le produit n'existe pas` });
        if (req.body.orders[i].product.stock < quantities) return res.status(403).json({ error: `Il n'y a pas assez de stocks !` });;
        if (!isValidQuantities) return res.status(403).json({ error: `Format de quantités non-valide !` });
        if (!isValidPrice) return res.status(403).json({ error: `Format de prix non-valide !` });
    }
    next();
}

export const validFormUpdateOrder = async (req, res, next) => {

    for (let i = 0; i < req.orders.length; i++) {
        const product = await Product.findByPk(req.orders[i].productId);
        const order = await Order.findByPk(req.orders[i].id);
        if (req.currentUser.roleId === partner && req.currentUser.shopId === product.shopId && order.orderStatusId === validate) {
            req.orders[i] = { shopId: req.orders[i].shopId, id: req.orders[i].id, orderStatusId: inProgress, number: req.orders[i].number }
        }
        else if (req.currentUser.roleId === partner && req.currentUser.shopId === product.shopId && order.orderStatusId === inProgress) {
            req.orders[i] = { shopId: req.orders[i].shopId, id: req.orders[i].id, orderStatusId: available, number: req.orders[i].number }
        }
        else if (req.currentUser.roleId === partner && req.currentUser.shopId === product.shopId && order.orderStatusId === available) {
            req.orders[i] = { shopId: req.orders[i].shopId, id: req.orders[i].id, orderStatusId: collected, number: req.orders[i].number }
        }
        else if (req.currentUser.roleId === client && req.currentUser.id === order.userId && order.orderStatusId === validate) {
            req.orders[i] = { shopId: req.orders[i].shopId, id: req.orders[i].id, orderStatusId: canceled, number: req.orders[i].number }
        }
        else return res.status(403).json({ error: `Vous ne pouvez pas modifier cette commande !` });
    }
    next();
}