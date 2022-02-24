import sequelize from './DBConfig.js';
import ChalkMSG from '../Scripts/Chalk.js';

import { Shop, Product, Role, User, Order, Ticket, Message, TicketStatus, OrderStatus } from '../Models/Models.js'; /* KeepIt */

console.log(`${ChalkMSG.INFO}Creating Database...`)
sequelize
    .sync({ force: true })
    .then(created => {
        console.log(`${ChalkMSG.SUCCESS}Database Successfully Created.`)
        process.exit();
    })
    .catch(err => {
        console.log(`${ChalkMSG.ERROR}${err}`)
        console.log(`${ChalkMSG.ERROR}Try to launch your Laragon, Xamp or Wamp server.`)
        process.exit();
    });