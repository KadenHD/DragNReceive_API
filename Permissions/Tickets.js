import { v4 as uuidv4 } from 'uuid';

import { Ticket } from '../Models/Models.js';

import {  } from '../Validations/Exists.js'; //if ticket is closed ?
import { canCreateTicket, canViewTicket, canUpdateTicket } from '../Validations/Tickets.js';
import {  } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedTickets = (currentUser, tickets) => { // Fetch inside findAllTickets controller
    if (currentUser.roleId === sadmin) return tickets; // If Super Admin return all tickets
    if (currentUser.roleId === admin) return tickets.filter(tickets => tickets.userId.roleId > admin && tickets.userId === currentUser.id) // If Admin return only partner and client
    return tickets.filter(ticket => ticket.userId === currentUser.id); // Else return only himself
}

export const setTicket = async (req, res, next) => { // For id's parameters routes to set the ticket values from DB
    req.ticket = await Ticket.findByPk(req.params.id);
    if (!req.ticket) return res.status(404).json({ error: `Le ticket n'existe pas !` });
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
    // Check exists and validities

    // Check valids format values

    req.ticket = {
        id: uuidv4(),
        //etc
    }
    next();
}

export const validFormUpdateTicket = async (req, res, next) => {
    if (1) {

    } else {
        return res.status(401).json({ error: `Retournez un formulaire valide` });
    }
    next();
}
