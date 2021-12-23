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
router.use('/messages', messagesRouter);
router.use('/orders', ordersRouter);
router.use('/products', productsRouter);
router.use('/shops', shopsRouter);
router.use('/tickets', ticketsRouter);
router.use('/users', usersRouter);

export default router;