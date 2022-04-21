import express from 'express';

import { findAllOrder, createOrder, findOneOrder, updateOrder, cancelOrder } from '../Controllers/Order.js';
import { setOrder, authCreateOrder, validFormCreateOrder, validFormUpdateOrder, validFormCancelOrder } from '../Permissions/Orders.js';

const router = express.Router();

router.get('/', findAllOrder);
router.post('/', authCreateOrder, validFormCreateOrder, createOrder);
router.get('/:id', setOrder, findOneOrder)
router.put('/:id', setOrder, validFormUpdateOrder, updateOrder);
router.post('/cancelOrder', validFormCancelOrder, cancelOrder);

export default router;