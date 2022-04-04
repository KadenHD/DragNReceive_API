import express from 'express';

import { loginUser, loginClient, getCurrentUser, createForgotUser, updateResetUser, createForgotClient, updateResetClient } from '../Controllers/Auth.js';
import { createUser } from '../Controllers/User.js';
import { validFormCreateUser } from '../Permissions/Users.js';
import { authRegisterClient, validForgotUser, validResetUser, validForgotClient, validResetClient } from '../Permissions/Auths.js';

const router = express.Router();

router.post('/loginUser', loginUser);
router.post('/loginClient', loginClient);
router.post('/register', authRegisterClient, validFormCreateUser, createUser);
router.get('/currentUser', getCurrentUser);
router.post('/forgotUser', validForgotUser, createForgotUser);
router.post('/resetUser/:userId/:token', validResetUser, updateResetUser);
router.post('/forgotClient', validForgotClient, createForgotClient);
router.post('/resetClient/:userId/:id', validResetClient, updateResetClient);

export default router;