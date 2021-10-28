import dotenv from 'dotenv';
import express from 'express';

import defaultRoutes from './Routes/Routes.js';
import usersRoutes from './Routes/Users.js';

dotenv.config(); // add the variables from .env to process.env
const app = express();

app.use(express.json()) //For JSON requests
app.use(express.urlencoded({ extended: true }));

/* Define Routes */
app.use('/api', defaultRoutes);
app.use('/api/users', usersRoutes);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port : http://localhost:${port}`));
