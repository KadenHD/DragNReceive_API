import express from 'express';

import { getUsers, createUser, getUser, deleteUser, updateUser } from '../Controllers/Users.js';

const router = express.Router();

// all routes in here are starting with '/users'
router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;