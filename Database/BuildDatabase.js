import sequelize from './DBConfig.js';
import bcrypt from 'bcrypt';

import { User, Role, Ticket, Message, Shop, Product, Logo, Order } from '../Models/Models.js';

// Hash the password
const hashedSadmin = await bcrypt.hash("sadmin", 10);
const hashedAdmin = await bcrypt.hash("admin", 10);
const hashedPartner = await bcrypt.hash("partner", 10);
const hashedUser = await bcrypt.hash("user", 10);

sequelize
    .sync({ force: true })
    .then(result => {
        return (
            
            Role.create({ id: "1", label: "SUPERADMIN" }),
            Role.create({ id: "2", label: "ADMIN" }),
            Role.create({ id: "3", label: "PARTNER" }),
            Role.create({ id: "4", label: "USER" }),

            User.create({ id: "1", lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: "1" }),
            User.create({ id: "2", lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: "2" }),
            User.create({ id: "3", lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: "3" }),
            User.create({ id: "4", lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: "4" })
        
        );
    })
    .then(created => {
        console.log("Database Successfully Created !!!")
        process.exit();
    })
    .catch(err => {
        console.log(err)
    })