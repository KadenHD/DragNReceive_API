import express from 'express';

import { createMessage } from '../Controllers/Message.js';

const router = express.Router();

router.post('/', createMessage);

export default router;