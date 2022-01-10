import { v4 as uuidv4 } from 'uuid';

import { Ticket } from '../Models/Models.js';

import { scopedTickets } from '../Permissions/Tickets.js';

export const findAllTickets = (req, res) => {
    Ticket.findAll()
        .then(data => {
            data = scopedTickets(req.currentUser, data);
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de tickets.`
            });
        });
}

export const createTicket = async (req, res) => {
    const ticket = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content,
        ticketStatusId: 1
    }
    Ticket.create(ticket)
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
    Ticket.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche du ticket.`
            });
        });
}

export const updateTicket = async (req, res) => {
    Ticket.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            res.status(200).json({
                success: `Le ticket a bien été modifié`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du ticket.`
            });
        });
}