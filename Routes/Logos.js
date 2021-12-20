import express from 'express';

import { findAllLogos, findOneLogo, updateLogo } from '../Controllers/Logo.js';

const router = express.Router();

router.get('/', findAllLogos);
router.get('/:id', findOneLogo);
router.put('/:id', updateLogo);

export default router;