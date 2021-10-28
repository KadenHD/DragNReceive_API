import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello from Homepage.'));

router.post('/login', (req, res) => res.send('Hello from Login.'));

export default router;