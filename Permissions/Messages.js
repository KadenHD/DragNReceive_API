import { v4 as uuidv4 } from 'uuid';

import { Ticket } from '../Models/Models.js';

import { canCreateMessage } from '../Validations/Messages.js';
import { isValidContent } from '../Validations/Formats.js';
import { ticketExist } from '../Validations/Exists.js';

export const setTicket = async (req, res, next) => {
    req.ticket = await Ticket.findByPk(req.body.ticketId);
    if (!req.ticket) return res.status(404).json({ error: `Le ticket n'existe pas !` });
    next();
}

export const authCreateMessage = (req, res, next) => {
    if (!canCreateMessage(req.currentUser, req.ticket)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à envoyer un message sur ce ticket !` });
    next();
}

export const validFormCreateMessage = async (req, res, next) => {
    if (!req.body.content || !req.body.ticketId) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (!await ticketExist(req.body.ticketId)) return res.status(404).json({ error: `Le ticket n'existe pas !` });
    if (!isValidContent(req.body.content)) return res.status(401).json({ error: `Format de contenu non-valide !` });
    req.body = {
        id: uuidv4(),
        content: req.body.content,
        userId: req.currentUser.id,
        ticketId: req.body.ticketId
    }
    next();
}
