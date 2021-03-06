import { v4 as uuidv4 } from 'uuid';

import { Order, Product, Shop } from '../Models/Models.js';
import { scopedOrders } from '../Permissions/Orders.js';
import { updatedOrderAvailable, updatedOrderCanceled, updatedOrderCollected, updatedOrderInProgress, newOrder } from '../Scripts/NodeMailer.js';

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
    try {
        let finalList = [];
        let noError = true
        const orders = req.body.orders;
        const number = uuidv4();
        for (let i = 0; i < orders.length; i++) {
            const { quantities, id } = orders[i];
            let order = {
                id: uuidv4(),
                quantities: quantities,
                price: parseFloat(orders[i].product.price * quantities).toFixed(2),
                number: number,
                userId: req.currentUser.id,
                productId: id,
                shopId: orders[i].product.shopId,
                orderStatusId: "1",
                product: orders[i].product
            };
            finalList.push(order)
            const product = { stock: orders[i].product.stock - quantities };
            await Order.create(order)
                .catch(() => {
                    noError = false
                    res.status(500).json({
                        error: `Une erreur est survenue lors de la création de la commande.`
                    });
                });
            await Product.update(product, { where: { id: order.productId } })
                .catch(() => {
                    noError = false
                    res.status(500).json({
                        error: `Une erreur est survenue lors de la création de la commande.`
                    });
                });
        }
        if (noError) {
            newOrder(req.currentUser, finalList);
            res.status(200).json({
                success: `La commande a bien été créée.` // email ?
            });
        }
    } catch (error) {
        console.log(error)
    }
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
}

export const cancelOrder = async (req, res) => {
    for (let i = 0; i < req.orders.length; i++) {
        const currentUser = req.currentUser
        const number = req.body.number
        const shop = req.orders[i].shop
        for (let j = 0; j < req.orders[i].orders.length; j++) {
            const order = req.orders[i].orders[j]
            await Order.update(order, { where: { id: order.id } })
                .catch(() => {
                    res.status(500).json({
                        error: `Une erreur est survenue de lors de la modification de la commande.`
                    });
                });
            const product = { stock: order.product.stock + order.quantities };
            await Product.update(product, { where: { id: order.productId } })
                .catch(() => {
                    res.status(500).json({
                        error: `Une erreur est survenue de lors de la modification des stocks.`
                    });
                });
        }
        updatedOrderCanceled(currentUser, number, shop); // for each shops
    }
    res.status(200).json({
        success: `La commande a bien été annulé.`
    });
}
