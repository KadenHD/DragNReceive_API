import express from 'express';

import { findAllOrder, createOrder, findOneOrder, updateOrder } from '../Controllers/Order.js';
import { setOrder, authCreateOrder, validFormCreateOrder, validFormUpdateOrder } from '../Permissions/Orders.js';

const router = express.Router();

router.get('/', findAllOrder);
router.post('/', authCreateOrder, validFormCreateOrder, createOrder);
router.get('/:number', setOrder, findOneOrder)
router.put('/:number', setOrder, validFormUpdateOrder, updateOrder);

export default router;