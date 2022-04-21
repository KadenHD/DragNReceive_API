import { Order, Product, User, Shop } from '../Models/Models.js';
import { canCreateOrder } from '../Validations/Orders.js';
import { isValidQuantities } from '../Validations/Formats.js';

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
                orders[i].dataValues.product = await Product.findByPk(orders[i].productId); /* Return every orders */
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
                if (orders[i].number === numberTab[j] && orders[i].shopId === currentUser.shopId) { /* is own shop only */
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
                if (orders[i].number === numberTab[j] && orders[i].userId === currentUser.id) { /* is own orders only */
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
                let status = orders[0].orderStatusId;
                let price = 0;
                for (let i = 0; i < orders.length; i++) {
                    orders[i].dataValues.product = await Product.findByPk(orders[i].productId)
                    price += orders[i].price * orders[i].quantities;
                    if (status > orders[i].orderStatusId) { status = orders[i].orderStatusId }
                }
                finalTab.push({ price: price, status: status, number: orders[0].number, date: orders[0].createdAt, orders: orders })
            }
        }
        return finalTab
    }
}

export const setOrder = async (req, res, next) => { /* For id's parameters routes to set the order values from DB */
    const orders = await Order.findAll({ where: { number: req.params.id } });
    if (!orders.length) return res.status(404).json({ error: `La commande n'existe pas !` });
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
    let price = 0;
    for (let i = 0; i < req.orders.length; i++) {
        req.orders[i].dataValues.user = user;
        req.orders[i].dataValues.product = await Product.findByPk(orders[i].productId)
        req.orders[i].dataValues.shop = await Shop.findByPk(req.orders[i].shopId)
        price += req.orders[i].price * req.orders[i].quantities;
    }
    next();
}

export const authCreateOrder = (req, res, next) => {
    if (!canCreateOrder(req.currentUser, req.body)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à créer une commande !` });
    next();
}

export const validFormCreateOrder = async (req, res, next) => {
    if (!req.body.orders) { return res.status(403).json({ error: `La commande est vide !` }); }
    for (let i = 0; i < req.body.orders.length; i++) {
        const { quantities, id } = req.body.orders[i];
        if (!quantities || !id) return res.status(403).json({ error: `Le formulaire n'est pas bon !` });
        if (!isValidQuantities(quantities)) return res.status(403).json({ error: `Format de quantités non-valide !` });
        req.body.orders[i].product = await Product.findOne({ where: { id: id, deleted: false } });
        if (!req.body.orders[i].product) return res.status(404).json({ error: `Le produit n'existe pas` });
        if (req.body.orders[i].product.stock < quantities) return res.status(403).json({ error: `Il n'y a pas assez de stocks !` });;
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
        else return res.status(403).json({ error: `Vous ne pouvez pas modifier cette commande !` });
    }
    next();
}

export const validFormCancelOrder = async (req, res, next) => {
    const { number, shops } = req.body;
    if (!number || !shops.length) { return res.status(403).json({ error: `La demande d'annulation de commande n'est pas valide !` }); }
    const orders = await Order.findAll({ where: { number: number } });
    for (let i = 0; i < orders.length; i++) { orders[i].dataValues.product = await Product.findByPk(orders[i].productId) }
    if (req.currentUser.roleId != client || orders[0].userId != req.currentUser.id) {
        return res.status(403).json({ error: `Vous ne pouvez pas annuler cette commande !` });
    }
    req.orders = [];
    for (let i = 0; i < shops.length; i++) {
        const findShop = await Shop.findByPk(shops[i]);
        const filterOrders = orders.filter(order => order.shopId === shops[i]);
        req.orders.push({
            shop: findShop,
            orders: filterOrders
        })
        if (!req.orders.length || !findShop || !filterOrders) { return res.status(403).json({ error: `La demande d'annulation de commande n'est pas valide !` }); }
    }
    for (let i = 0; i < req.orders.length; i++) {
        for (let j = 0; j < req.orders[i].orders.length; j++) {
            if (req.orders[i].orders[j].orderStatusId != validate) { return res.status(403).json({ error: `Vous ne pouvez annuler que des commandes non-traitées !` }); }
            else {
                req.orders[i].orders[j] = {
                    shopId: req.orders[i].orders[j].shopId,
                    id: req.orders[i].orders[j].id,
                    orderStatusId: canceled,
                    number: req.orders[i].orders[j].number,
                    product: req.orders[i].orders[j].dataValues.product.dataValues,
                    quantities: req.orders[i].orders[j].quantities,
                    productId: req.orders[i].orders[j].productId
                }
            }
        }
    }
    next();
}