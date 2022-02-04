import express from 'express';

import { loginUser, loginClient, getCurrentUser } from '../Controllers/Auth.js';
import { createUser } from '../Controllers/User.js';

import { validFormCreateUser } from '../Permissions/Users.js';
import { authRegisterClient } from '../Permissions/Auths.js';

const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/loginClient', loginClient);
router.post('/register', authRegisterClient, validFormCreateUser, createUser);
router.get('/currentUser', getCurrentUser);

export default router;