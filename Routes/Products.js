import express from 'express';

import { findAllProducts, createProduct, findOneProduct, deleteProduct, updateProduct } from '../Controllers/Product.js';

const router = express.Router();

router.get('/', findAllProducts);
router.post('/', createProduct);
router.get('/:id', findOneProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;