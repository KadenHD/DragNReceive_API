import express from 'express';

import { findAllOrder, createOrder, findOneOrder, updateOrder } from '../Controllers/Order.js';

const router = express.Router();

router.get('/', findAllOrder);
router.post('/', createOrder);
router.get('/:id', findOneOrder);
router.put('/:id', updateOrder);

export default router;