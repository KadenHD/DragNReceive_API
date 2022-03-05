import { Message, Ticket } from '../Models/Models.js';

import { responsedTicket } from '../Scripts/NodeMailer.js';

export const createMessage = (req, res) => {
    Message.create(req.body)
        .then(data => {
            req.ticket.updatedAt = new Date()
            Ticket.update(req.ticket.dataValues, { where: { id: req.ticket.id } })
                .then(data => {
                    if (req.currentUser.id != req.ticket.userId) { responsedTicket(req.ticket, req.ticket.dataValues.user) }
                    res.status(200).json({
                        success: `Le message a bien été créé.`
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: `Une erreur est survenue lors de la création du message.`
                    });
                })

        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du message.`
            });
        });
}