import express from 'express';

import { currentUser, loginUser } from '../Controllers/Auth.js';
import { CheckToken } from '../Middlewares/Token.js';

const router = express.Router();

router.get('/user', CheckToken, currentUser);

router.post('/login', loginUser);

export default router;