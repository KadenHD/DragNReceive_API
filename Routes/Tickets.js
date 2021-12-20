import express from 'express';

import { findAllTickets, createTicket, findOneTicket, updateTicket } from '../Controllers/Ticket.js';

const router = express.Router();

router.get('/', findAllTickets);
router.post('/', createTicket);
router.get('/:id', findOneTicket);
router.put('/:id', updateTicket);

export default router;