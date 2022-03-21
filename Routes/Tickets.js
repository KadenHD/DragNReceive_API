import express from 'express';

import { findAllTickets, createTicket, findOneTicket, updateTicket } from '../Controllers/Ticket.js';
import { setTicket, authCreateTicket, validFormCreateTicket, authGetTicket, authUpdateTicket, validFormUpdateTicket } from '../Permissions/Tickets.js';

const router = express.Router();

router.get('/', findAllTickets);
router.post('/', authCreateTicket, validFormCreateTicket, createTicket);
router.get('/:id', setTicket, authGetTicket, findOneTicket);
router.put('/:id', setTicket, authUpdateTicket, validFormUpdateTicket, updateTicket);

export default router;