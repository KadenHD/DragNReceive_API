import { v4 as uuidv4 } from 'uuid';

import { Ticket, User, Message } from '../Models/Models.js';

import { canCreateTicket, canViewTicket, canUpdateTicket } from '../Validations/Tickets.js';
import { isValidTitle, isValidContent } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedTickets = async (currentUser, tickets) => { /* Fetch inside findAllTickets controller */
    /* Store inside reqs */
    for (let i = 0; i < tickets.length; i++) {
        const user = await User.findByPk(tickets[i].userId); /* Add user inside tickets */
        tickets[i].dataValues.user = user.dataValues;
        const messages = await Message.findAll({ where: { ticketId: tickets[i].id } });
        tickets[i].dataValues.messages = messages;
    }
    /* fetch returns */
    if (currentUser.roleId === sadmin) return tickets; /* If Super Admin return all tickets */
    if (currentUser.roleId === admin) return tickets.filter(ticket => ticket.dataValues.user.roleId === partner || ticket.dataValues.user.roleId === client || ticket.userId === currentUser.id) /* If Admin return only partner and client and own */
    return tickets.filter(ticket => ticket.userId === currentUser.id); /* Else return only himself */
}

export const setTicket = async (req, res, next) => { /* For id's parameters routes to set the ticket values from DB */
    req.ticket = await Ticket.findByPk(req.params.id);
    if (!req.ticket) return res.status(404).json({ error: `Le ticket n'existe pas !` });
    req.ticket.dataValues.user = await User.findByPk(req.ticket.userId);
    if (!req.ticket.dataValues.user) return res.status(404).json({ error: `L'utilisateur affilié à ce ticket n'existe pas !` });
    req.ticket.dataValues.messages = await Message.findAll({ where: { ticketId: req.ticket.id } });
    next();
}

export const authCreateTicket = (req, res, next) => {
    if (!canCreateTicket(req.currentUser, req.body)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à créer un ticket !` });
    next();
}

export const authGetTicket = (req, res, next) => {
    if (!canViewTicket(req.currentUser, req.ticket)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à voir ce ticket !` });
    next();
}

export const authUpdateTicket = (req, res, next) => {
    if (!canUpdateTicket(req.currentUser, req.ticket)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à modifier ce ticket !` });
    next();
}

export const validFormCreateTicket = async (req, res, next) => {
    if (!req.body.title || !req.body.content) return res.status(401).json({ error: `Le formulaire n'est pas bon !` });
    if (!isValidTitle(req.body.title)) return res.status(401).json({ error: `Format de titre non-valide !` });
    if (!isValidContent(req.body.content)) return res.status(401).json({ error: `Format de contenu non-valide !` });
    req.body = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content,
        userId: req.currentUser.id,
        ticketStatusId: "1"
    };
    next();
}

export const validFormUpdateTicket = async (req, res, next) => {
    if (req.ticket.ticketStatusId === "2") return res.status(401).json({ error: `Le ticket est déjà clos !` });
    req.body = { ticketStatusId: "2" };
    next();
}
