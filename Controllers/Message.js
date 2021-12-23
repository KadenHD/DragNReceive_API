import { v4 as uuidv4 } from 'uuid';

import { Message } from '../Models/Models.js';

export const findAllMessages = (req, res) => {
    Message.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de messages.`
            });
        });
}

export const createMessage = async (req, res) => {
    const message = {
        id: uuidv4(),
        content: req.body.content,
        userId: req.body.userId,
        ticketId: req.body.ticketId
    }
    Message.create(message)
        .then(data => {
            res.status(200).json({
                success: `Le message a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du message.`
            });
        });
}

export const findOneMessage = (req, res) => {
    Message.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche du message.`
            });
        });
}