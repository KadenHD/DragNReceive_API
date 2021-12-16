import sequelize from './DBConfig.js';

import { Logo, Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js';
import { logos, shops, products, roles, users, orders, tickets, messages } from './Faker.js';

sequelize
    .sync({ force: true })
    .then(result => {
        return (
            //Logo.create(),
            
            Shop.create(shops[0]),

            //Product.create(),

            Role.create(roles[0]),
            Role.create(roles[1]),
            Role.create(roles[2]),
            Role.create(roles[3]),

            User.create(users[0]),
            User.create(users[1]),
            User.create(users[2]),
            User.create(users[3])
            
            //Order.create(),
            
            //Ticket.create(),
            
            //Message.create()
        );
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })