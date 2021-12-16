import sequelize from './DBConfig.js';

import { Logo, Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js';
import { logos, shops, products, roles, defaultUsers, users, orders, tickets, messages } from './Faker.js';

sequelize
    .sync({ force: true })
    .then(result => {
        return (
            /* 
            Logo.create(logos[1]),
            Logo.create(logos[2]),
            Logo.create(logos[3]),
            Logo.create(logos[4]),
            Logo.create(logos[5]),
            Logo.create(logos[6]),
            Logo.create(logos[7]),
            Logo.create(logos[8]),
            Logo.create(logos[9]),
            Logo.create(logos[10]),
            */
            Shop.create(shops[1]),
            Shop.create(shops[2]),
            Shop.create(shops[3]),
            Shop.create(shops[4]),
            Shop.create(shops[5]),
            Shop.create(shops[6]),
            Shop.create(shops[7]),
            Shop.create(shops[8]),
            Shop.create(shops[9]),
            Shop.create(shops[10]),

            Product.create(products[1]),
            Product.create(products[2]),
            Product.create(products[3]),
            Product.create(products[4]),
            Product.create(products[5]),
            Product.create(products[6]),
            Product.create(products[7]),
            Product.create(products[8]),
            Product.create(products[9]),
            Product.create(products[10]),

            Role.create(roles[0]),
            Role.create(roles[1]),
            Role.create(roles[2]),
            Role.create(roles[3]),

            User.create(defaultUsers[0]),
            User.create(defaultUsers[1]),
            User.create(defaultUsers[2]),
            User.create(defaultUsers[3]),

            User.create(users[1]),
            User.create(users[2]),
            User.create(users[3]),
            User.create(users[4]),
            User.create(users[5]),
            User.create(users[6]),
            User.create(users[7]),
            User.create(users[8]),
            User.create(users[9]),
            User.create(users[10])
            /*
            Order.create(orders[1]),
            Order.create(orders[2]),
            Order.create(orders[3]),
            Order.create(orders[4]),
            Order.create(orders[5]),
            Order.create(orders[6]),
            Order.create(orders[7]),
            Order.create(orders[8]),
            Order.create(orders[9]),
            Order.create(orders[10]),
        
            Ticket.create(tickets[1]),
            Ticket.create(tickets[2]),
            Ticket.create(tickets[3]),
            Ticket.create(tickets[4]),
            Ticket.create(tickets[5]),
            Ticket.create(tickets[6]),
            Ticket.create(tickets[7]),
            Ticket.create(tickets[8]),
            Ticket.create(tickets[9]),
            Ticket.create(tickets[10]),
            
            Message.create(messages[1]),
            Message.create(messages[2]),
            Message.create(messages[3]),
            Message.create(messages[4]),
            Message.create(messages[5]),
            Message.create(messages[6]),
            Message.create(messages[7]),
            Message.create(messages[8]),
            Message.create(messages[9]),
            Message.create(messages[10])
            */
        );
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })