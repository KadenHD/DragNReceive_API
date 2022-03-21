import express from 'express';

import { findAllShops, createShop, findOneShop, deleteShop, updateShop } from '../Controllers/Shop.js';
import { setShop, authCreateShop, authGetShop, authDeleteShop, authUpdateShop, validFormCreateShop, validFormUpdateShop } from '../Permissions/Shops.js';

const router = express.Router();

router.get('/', findAllShops);
router.post('/', authCreateShop, validFormCreateShop, createShop);
router.get('/:id', setShop, authGetShop, findOneShop);
router.delete('/:id', setShop, authDeleteShop, deleteShop);
router.put('/:id', setShop, authUpdateShop, validFormUpdateShop, updateShop);

export default router;