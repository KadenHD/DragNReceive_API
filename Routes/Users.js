import express from 'express';

import { findAllUsers, createUser, findOneUser, deleteUser, updateUser } from '../Controllers/User.js';

import { setUser, authCreateUser, authGetUser, authDeleteUser, authUpdateUser, validFormCreateUser, validFormUpdateUser } from '../Permissions/Users.js';

const router = express.Router();

router.get('/', findAllUsers);
router.post('/', authCreateUser, validFormCreateUser, createUser);
router.get('/:id', setUser, authGetUser, findOneUser);
router.delete('/:id', setUser, authDeleteUser, deleteUser);
router.put('/:id', setUser, authUpdateUser, validFormUpdateUser, updateUser);

export default router;