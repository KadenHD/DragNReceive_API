import sequelize from './DBConfig.js';

import { Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js'; //Keep It

sequelize
    .sync({ force: true })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });