import { v4 as uuidv4 } from 'uuid';

import { Order } from '../Models/Models.js';

export const findAllOrder = (req, res) => {

    Order.findAll()
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

    if (!req.body.orders) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }

    const orders = req.body.orders //Req Orders should be like this : [{},{}]

    const number = uuidv4();
    for (let i = 0; i < orders.length; i++) {
        const { quantities, price, userId, productId } = orders[i];
        await Order.create({
            id: uuidv4(),
            quantities: quantities,
            price: price,
            number: number,
            userId: userId,
            productId: productId,
            orderStatusId: 1
        })
            .then(data => {
                res.status(200).json({
                    success: `La commande a bien été créée.`
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de la création de la commande.`
                });
            });
    }

}

export const findOneOrder = (req, res) => {

    const id = req.params.id;

    Order.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    error: `La commande n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de la commande.`
            });
        });

}

export const updateOrder = async (req, res) => {

    if (!orderStatusId) {
        res.status(400).json({
            error: "Requête non-valide."
        });
        return;
    }

    const id = req.params.id;
    const order = Order.findByPk(id);

    if (orderStatusId) order.orderStatusId = orderStatusId;

    Order.update(order, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    success: `La commande a bien été modifiée`
                });
            } else {
                res.json({
                    error: `Impossible de modifier la commande. Peut-être que la commande n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de la commande.`
            });
        })

}
