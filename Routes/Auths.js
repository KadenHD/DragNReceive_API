import express from 'express';

import { loginUser, loginClient, getCurrentUser, createForgotUser, updateResetUser } from '../Controllers/Auth.js';
import { createUser } from '../Controllers/User.js';
import { validFormCreateUser } from '../Permissions/Users.js';
import { authRegisterClient, validForgotUser, validResetUser } from '../Permissions/Auths.js';

const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/loginClient', loginClient);
router.post('/register', authRegisterClient, validFormCreateUser, createUser);
router.get('/currentUser', getCurrentUser);
router.post('/forgotUser', validForgotUser, createForgotUser);
router.post('/resetUser/:userId/:token', validResetUser, updateResetUser);

export default router;