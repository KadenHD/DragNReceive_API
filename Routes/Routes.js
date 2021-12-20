import express from 'express';

import { currentUser, loginUser } from '../Controllers/Auth.js';
import { CheckToken } from '../Middlewares/TokenJWT.js';

const router = express.Router();

router.post('/login', loginUser);

router.get('/logo', CheckToken, currentUser);

router.get('/message', CheckToken, currentUser);

router.get('/order', CheckToken, currentUser);

router.get('/product', CheckToken, currentUser);

router.get('/shop', CheckToken, currentUser);

router.get('/ticket', CheckToken, currentUser);

router.get('/user', CheckToken, currentUser);



export default router;