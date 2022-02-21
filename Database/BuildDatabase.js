import sequelize from './DBConfig.js';

import { Shop, Product, Role, User, Order, Ticket, Message, TicketStatus, OrderStatus } from '../Models/Models.js'; /* KeepIt */

console.log("INFO: Creating Database...")
sequelize
    .sync({ force: true })
    .then(created => {
        console.log("SUCCESS: Database Successfully Created.")
        process.exit();
    })
    .catch(err => {
        console.log("ERROR: " + err)
        console.log("ERROR: Try to launch your Laragon, Xamp or Wamp server.")
        process.exit();
    });