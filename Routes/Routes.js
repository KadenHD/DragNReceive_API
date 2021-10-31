import express from 'express';

import { currentUser, loginUser } from '../Controllers/Auth.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello from Homepage.'));

router.post('/user', currentUser);

router.post('/login', loginUser);

export default router;