import { v4 as uuidv4 } from 'uuid';

import { Order, Product, Shop } from '../Models/Models.js';
import { scopedOrders } from '../Permissions/Orders.js';
import { updatedOrderAvailable, updatedOrderCanceled, updatedOrderCollected, updatedOrderInProgress } from '../Scripts/NodeMailer.js';

export const findAllOrder = async (req, res) => {
    scopedOrders(req.currentUser, await Order.findAll())
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de commandes.`
            });
        });
}

export const createOrder = async (req, res) => {
    const orders = req.body.orders;
    const number = uuidv4();
    for (let i = 0; i < orders.length; i++) {
        const { quantities, price, productId } = orders[i];
        const order = {
            id: uuidv4(),
            quantities: quantities,
            price: price,
            number: number,
            userId: req.currentUser.id,
            productId: productId,
            shopId: orders[i].product.shopId,
            orderStatusId: "1"
        };
        const product = { stock: orders[i].product.stock - quantities };
        await Order.create(order)
            .catch(() => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de la création de la commande.`
                });
            });
        await Product.update(product, order.productId)
            .catch(() => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de la création de la commande.`
                });
            });
    }
    res.status(200).json({
        success: `La commande a bien été créée.`
    });
}

export const findOneOrder = (req, res) => {
    try {
        res.status(200).json(req.orders)
    } catch (err) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la recherche de la commande.`
        });
    }
}

export const updateOrder = async (req, res) => {
    for (let i = 0; i < req.orders.length; i++) {
        await Order.update(req.orders[i], { where: { id: req.orders[i].id } })
            .then(async () => {
                if (req.orders[i].orderStatusId === "5") {
                    const product = { stock: req.orders[i].product.stock + req.orders[i].quantities };
                    await Product.update(product, { where: { id: req.orders[i].productId } });
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: `Une erreur est survenue de lors de la modification de la commande.`
                });
            });
    }
    const shop = await Shop.findByPk(req.orders[0].shopId)
    if (req.orders[0].orderStatusId === "2") {
        updatedOrderInProgress(req.currentUser, req.orders[0].number, shop);
        res.status(200).json({
            success: `La commande est désormais en cours de préparation.`
        });
    }
    else if (req.orders[0].orderStatusId === "3") {
        updatedOrderAvailable(req.currentUser, req.orders[0].number, shop);
        res.status(200).json({
            success: `La commande est désormais prête.`
        });
    }
    else if (req.orders[0].orderStatusId === "4") {
        updatedOrderCollected(req.currentUser, req.orders[0].number, shop);
        res.status(200).json({
            success: `La commande a bien été récupéré.`
        });
    }
    else if (req.orders[0].orderStatusId === "5") {
        updatedOrderCanceled(req.currentUser, req.orders[0].number, shop);
        res.status(200).json({
            success: `La commande a bien été annulé.`
        });
    }
}
