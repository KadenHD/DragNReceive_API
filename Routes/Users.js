import express from 'express';

import { findAllUsers, createUser, findOneUser, deleteUser, updateUser } from '../Controllers/Users.js';

const router = express.Router();

router.get('/', findAllUsers);
router.post('/', createUser);
router.get('/:id', findOneUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;