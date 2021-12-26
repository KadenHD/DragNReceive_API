import express from 'express';

import { findAllUsers, createUser, findOneUser, deleteUser, updateUser } from '../Controllers/User.js';
import { setUser, authCreateUser, authGetUser, authDeleteUser, authUpdateUser } from '../Permissions/Users.js';

const router = express.Router();

router.get('/', findAllUsers);
router.post('/', authCreateUser, createUser);
router.get('/:id', setUser, authGetUser, findOneUser);
router.delete('/:id', setUser, authDeleteUser, deleteUser);
router.put('/:id', setUser, authUpdateUser, updateUser);

export default router;