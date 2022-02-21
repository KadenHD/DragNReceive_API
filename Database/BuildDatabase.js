import sequelize from './DBConfig.js';

import { Shop, Product, Role, User, Order, Ticket, Message, TicketStatus, OrderStatus } from '../Models/Models.js'; /* KeepIt */

sequelize
    .sync({ force: true })
    .then(created => {
        console.log("INFO: Database Successfully Created.")
        process.exit();
    })
    .catch(err => {
        process.exit();
    });