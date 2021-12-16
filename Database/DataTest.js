import sequelize from './DBConfig.js';

import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


import { Logo, Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js';
import { logos, shops, products, roles, defaultUsers, users, orders, tickets, messages } from './Faker.js';

// Hash the password
const hashedSadmin = await bcrypt.hash("sadmin", 10);
const hashedAdmin = await bcrypt.hash("admin", 10);
const hashedPartner = await bcrypt.hash("partner", 10);
const hashedUser = await bcrypt.hash("user", 10);

sequelize
    .sync({ force: true })
    .then(result => {
        return({});
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })

for(let i =0; i<5;i++){
    User.create({ id: i, lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: "1", shopId: null })
}