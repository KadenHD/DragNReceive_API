import express from 'express';

import { createMessage } from '../Controllers/Message.js';

import { authCreateMessage, validFormCreateMessage } from '../Permissions/Messages.js';
import { setTicket, setUser } from '../Permissions/Messages.js';

const router = express.Router();

router.post('/', setTicket, setUser, authCreateMessage, validFormCreateMessage, createMessage);

export default router;