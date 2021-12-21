import express from 'express';

import { loginUser } from '../Controllers/Auth.js';

const router = express.Router();

router.post('/login', loginUser);

export default router;