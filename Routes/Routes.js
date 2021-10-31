import express from 'express';

import { currentUser, loginUser } from '../Controllers/Auth.js';

const router = express.Router();

router.post('/user', currentUser);

router.post('/login', loginUser);

export default router;