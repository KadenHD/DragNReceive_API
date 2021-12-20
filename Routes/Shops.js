import express from 'express';

import { findAllShops, createShop, findOneShop, deleteShop, updateShop } from '../Controllers/Shop.js';

const router = express.Router();

router.get('/', findAllShops);
router.post('/', createShop);
router.get('/:id', findOneShop);
router.delete('/:id', deleteShop);
router.put('/:id', updateShop);

export default router;