import express from 'express';

import { loginUser } from '../Controllers/Auth.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello from Homepage.'));

router.post('/login', loginUser);

export default router;