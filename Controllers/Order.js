import { v4 as uuidv4 } from 'uuid';

import { Order, Product } from '../Models/Models.js';

import { scopedOrders } from '../Permissions/Orders.js';

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
            userId: currentUser.id,
            productId: productId,
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
    Order.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de la commande.`
            });
        });
}

export const updateOrder = async (req, res) => {
    const orders = req.body.orders
    for (let i = 0; i < orders.length; i++) {
        const order = { orderStatusId: req.body.orders[i].orderStatusId }
        await Order.update(order, { where: { id: orders[i].id } })
            .catch(err => {
                res.status(500).json({
                    error: `Une erreur est survenue de lors de la modification de la commande.`
                });
            });
        //Product update stock if canceled
    }
    res.status(200).json({
        success: `La commande a bien été modifiée.`
    });
}