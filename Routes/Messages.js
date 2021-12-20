import express from 'express';

import { findAllMessages, createMessage, findOneMessage } from '../Controllers/Message.js';

const router = express.Router();

router.get('/', findAllMessages);
router.post('/', createMessage);
router.get('/:id', findOneMessage);

export default router;