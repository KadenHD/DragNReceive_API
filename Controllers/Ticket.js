import { v4 as uuidv4 } from 'uuid';

import { Ticket } from '../Models/Models.js';

export const findAllTickets = (req, res) => {
    Ticket.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de tickets.`
            });
        });
}

export const createTicket = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }
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
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    error: `Le ticket n'existe pas.`
                });
            }
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
            if (num == 1) {
                res.status(200).json({
                    success: `Le ticket a bien été modifié`
                });
            } else {
                res.json({
                    error: `Impossible de modifier le ticket. Peut-être que le ticket n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du ticket.`
            });
        });
}