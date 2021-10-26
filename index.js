import dotenv from 'dotenv';
import express from 'express';

import usersRoutes from './routes/users.js';

dotenv.config(); //permet de mettre les variables du .env dans le process.env
const app = express();

app.use(express.json()) //For JSON requests
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello from Homepage.'));

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port : http://localhost:${port}`));
