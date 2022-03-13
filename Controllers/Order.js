import { v4 as uuidv4 } from 'uuid';

import { Order, Product } from '../Models/Models.js';

import { scopedOrders } from '../Permissions/Orders.js';
import { updatedOrderAvailable, updatedOrderCanceled, updatedOrderCollected, updatedOrderInProgress } from '../Scripts/NodeMailer.js';

export const findAllOrder = async (req, res) => {
    let data = await Order.findAll();
    scopedOrders(req.currentUser, data)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
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
            shopId: req.body.orders[i].product.shopId,
            orderStatusId: "1"
        };
        const product = { stock: req.body.orders[i].product.stock - quantities };
        await Order.create(order)
            .catch(err => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de la création de la commande.`
                });
            });
        await Product.update(product, order.productId)
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
    const orders = req.body.orders
    for (let i = 0; i < orders.length; i++) {
        const order = { orderStatusId: req.body.orders[i].orderStatusId }
        await Order.update(order, { where: { id: orders[i].id } })
            .then(async data => {
                if (req.body.orders[i].orderStatusId === "5") {
                    const product = { stock: req.body.orders[i].product.stock + req.body.orders[i].quantities };
                    await Product.update(product, order.productId);
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: `Une erreur est survenue de lors de la modification de la commande.`
                });
            });
    }
    if (req.body.orders[0].orderStatusId === "2") {
        updatedOrderInProgress(currentUser, req.body.orders[0].number, req.orders[0].shopId);
    }
    else if (req.body.orders[0].orderStatusId === "3") {
        updatedOrderAvailable(currentUser, req.body.orders[0].number, req.orders[0].shopId);
    }
    else if (req.body.orders[0].orderStatusId === "4") {
        updatedOrderCollected(currentUser, req.body.orders[0].number, req.orders[0].shopId);
    }
    else if (req.body.orders[0].orderStatusId === "5") {
        updatedOrderCanceled(currentUser, req.body.orders[0].number, req.orders[0].shopId);
    }
    res.status(200).json({
        success: `La commande a bien été modifiée.`
    });
}
