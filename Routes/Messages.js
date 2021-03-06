import express from 'express';

import { createMessage } from '../Controllers/Message.js';
import { setTicket, authCreateMessage, validFormCreateMessage } from '../Permissions/Messages.js';

const router = express.Router();

router.post('/', setTicket, authCreateMessage, validFormCreateMessage, createMessage);

export default router;