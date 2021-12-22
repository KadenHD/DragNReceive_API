import express from 'express';

import authsRouter from './Auths.js';
import messagesRouter from './Messages.js';
import ordersRouter from './Orders.js';
import productsRouter from './Products.js';
import shopsRouter from './Shops.js';
import ticketsRouter from './Tickets.js';
import usersRouter from './Users.js';

import { isValidToken } from '../Middlewares/TokenJWT.js';

const router = express.Router();

router.use('/', authsRouter);
router.use('/messages', isValidToken, messagesRouter);
router.use('/orders', isValidToken, ordersRouter);
router.use('/products', isValidToken, productsRouter);
router.use('/shops', isValidToken, shopsRouter);
router.use('/tickets', isValidToken, ticketsRouter);
router.use('/users', isValidToken, usersRouter);

export default router;