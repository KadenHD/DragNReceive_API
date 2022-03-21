import express from 'express';

import { findAllProducts, createProduct, deleteProduct, findOneProduct, updateProduct } from '../Controllers/Product.js';
import { setProduct, authCreateProduct, validFormCreateProduct, authDeleteProduct, authGetProduct, authUpdateProduct, validFormUpdateProduct } from '../Permissions/Products.js';

const router = express.Router();

router.get('/', findAllProducts)
router.post('/', authCreateProduct, validFormCreateProduct, createProduct);
router.delete('/:id', setProduct, authDeleteProduct, deleteProduct);
router.get('/:id', setProduct, authGetProduct, findOneProduct)
router.put('/:id', setProduct, authUpdateProduct, validFormUpdateProduct, updateProduct);

export default router;