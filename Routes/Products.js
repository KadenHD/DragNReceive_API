import express from 'express';

import { createProduct, deleteProduct, updateProduct } from '../Controllers/Product.js';

import { authCreateProduct, validFormCreateProduct, authDeleteProduct, authUpdateProduct, validFormUpdateProduct } from '../Permissions/Products.js';
import { setProduct } from '../Permissions/Products.js';

const router = express.Router();

router.post('/', authCreateProduct, validFormCreateProduct, createProduct);
router.delete('/:id', setProduct, authDeleteProduct, deleteProduct);
router.put('/:id', setProduct, authUpdateProduct, validFormUpdateProduct, updateProduct);

export default router;