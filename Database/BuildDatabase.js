import sequelize from './DBConfig.js';

import { User, Role, Ticket, Message, Shop, Product, Logo, Order } from '../Models/Models.js';

import { roles, users, tickets, messages, shops, products, logos, orders } from './Faker.js'

sequelize
    .sync({ force: true })
    .then(result => {
        return (
            Role.create(roles[0]),
            Role.create(roles[1]),
            Role.create(roles[2]),
            Role.create(roles[3]),

            User.create(users[0]),
            User.create(users[1]),
            User.create(users[2]),
            User.create(users[3])
        );
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })