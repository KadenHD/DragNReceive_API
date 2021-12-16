import sequelize from './DBConfig.js';

import { Logo, Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js';

sequelize
    .sync({ force: true })
    .then(result => {
        console.log("result");
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
    })
    .catch(err => {
        console.log(err);
        process.exit();
    })