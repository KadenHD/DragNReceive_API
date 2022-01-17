import { v4 as uuidv4 } from 'uuid';

import { Order } from '../Models/Models.js';

import { scopedOrders } from '../Permissions/Orders.js';

export const findAllOrder = (req, res) => {
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
    const orders = req.body.orders
    const number = uuidv4(); // Order number
    for (let i = 0; i < orders.length; i++) {
        const { quantities, price, userId, productId } = orders[i];
        const order = {
            id: uuidv4(),
            quantities: quantities,
            price: price,
            number: number,
            userId: userId,
            productId: productId,
            orderStatusId: 1
        }
        await Order.create(order)
            .catch(err => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de la création de la commande.`
                });
            });
        //Product update stock
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

export const updateOrder = (req, res) => {
    Order.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            res.status(200).json({
                success: `La commande a bien été modifiée`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de la commande.`
            });
        });
}