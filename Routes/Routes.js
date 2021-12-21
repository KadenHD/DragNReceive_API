import express from 'express';

import { currentUser, loginUser } from '../Controllers/Auth.js';
import { CheckToken } from '../Middlewares/TokenJWT.js';

const router = express.Router();

// Rajouter des s au fin de fonction pour que les middlewares soit mis en place
// En gros là j'accède directe aux fonctions 
// Donc faut que je route vraiment en passant de user à users comme dans le app.js

router.post('/login', loginUser);

router.get('/logo', CheckToken, currentUser);

router.get('/message', CheckToken, currentUser);

router.get('/order', CheckToken, currentUser);

router.get('/product', CheckToken, currentUser);

router.get('/shop', CheckToken, currentUser);

router.get('/ticket', CheckToken, currentUser);

router.get('/user', CheckToken, currentUser);

export default router;