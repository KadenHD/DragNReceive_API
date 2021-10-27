import express from 'express';

import { findAllUsers, createUser, findOneUser, deleteUser, updateUser } from '../Controllers/Users.js';

const router = express.Router();

// all routes in here are starting with '/users'
router.get('/', findAllUsers);

router.post('/', createUser);

router.get('/:id', findOneUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;