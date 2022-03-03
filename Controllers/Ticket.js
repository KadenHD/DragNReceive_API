import { Ticket } from '../Models/Models.js';

import { scopedTickets } from '../Permissions/Tickets.js';

import { closedTicket } from '../Scripts/NodeMailer.js';

export const findAllTickets = async (req, res) => {
    let data = await Ticket.findAll();
    scopedTickets(req.currentUser, data)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la recherche des tickets.`
            });
        });
}

export const createTicket = (req, res) => {
    Ticket.create(req.body)
        .then(data => {
            res.status(200).json({
                success: `Le ticket a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du ticket.`
            });
        });
}

export const findOneTicket = (req, res) => {
    try {
        res.status(200).json(req.ticket)
    } catch (err) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la recherche du ticket.`
        });
    }
}

export const updateTicket = (req, res) => {
    Ticket.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            closedTicket(req.ticket, req.ticket.dataValues.user);
            res.status(200).json({
                success: `Le ticket a bien été clos`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du ticket.`
            });
        });
}