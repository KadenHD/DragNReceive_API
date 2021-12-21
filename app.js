import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import defaultRoutes from './Routes/Routes.js';
import logosRoutes from './Routes/Logos.js';
import messagesRoutes from './Routes/Messages';
import ordersRoutes from './Routes/Orders';
import productsRoutes from './Routes/Products';
import shopsRoutes from './Routes/Shops';
import ticketsRoutes from './Routes/Tickets';
import usersRoutes from './Routes/Users.js';

dotenv.config(); // add the variables from .env to process.env

const app = express();

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Define Routes */
app.use('/api', defaultRoutes);
app.use('/api/logos', logosRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/shops', shopsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/users', usersRoutes);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running at :\n - Local : ${process.env.BASE_URL}:${port}`));
