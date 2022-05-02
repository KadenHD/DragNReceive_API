import express from 'express';

import { addToFavoris, removeToFavoris, seeClientFavoris } from '../Controllers/Favoris.js';

const router = express.Router();

router.post('/', addToFavoris);
router.delete('/:id', removeToFavoris);
router.get('/', seeClientFavoris);

export default router;