import express from 'express';

import { loginUser, loginClient } from '../Controllers/Auth.js';
import { createUser } from '../Controllers/User.js';
import { validFormCreateUser } from '../Permissions/Users.js';
import { authRegisterClient } from '../Permissions/Auth.js';

const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/loginClient', loginClient);
router.post('/register', authRegisterClient, validFormCreateUser, createUser);

export default router;