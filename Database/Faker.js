import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { Logo, Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js';

faker.locale = "fr";

try {
    defaultUsers();
} catch (error) {
    console.log(error);
} finally {
    console.log("DataBase instance and fake values created !");
}

//Create the fakes standards users
async function defaultUsers() {
    for(let i = 1; i<5 ; i++) {
        switch (i) {
            case 1:
                const hashedSadmin = await bcrypt.hash("sadmin", 10);
                Role.create({ id: i, label: "SUPERADMIN" });
                User.create({ id: i, lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: i, shopId: null });
                break;
            case 2:
                const hashedAdmin = await bcrypt.hash("admin", 10);
                Role.create({ id: i, label: "ADMIN" });
                User.create({ id: i, lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: i, shopId: null });
                break;
            case 3:
                const hashedPartner = await bcrypt.hash("partner", 10);
                Role.create({ id: i, label: "PARTNER" });
                User.create({ id: i, lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: i, shopId: null });
                break;
            case 4:
                const hashedUser = await bcrypt.hash("user", 10);
                Role.create({ id: i, label: "USER" });
                User.create({ id: i, lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: i, shopId: null });
                break;
        }
    }
}

async function fakeLogo() {
    const logoId = uuidv4();
    Logo.create({
        id: logoId,
        name: "",
        size: "",
        type: "",
        bin: ""
    });
    return logoId;
}

async function fakeShop(logoId) {
    const shopId = uuidv4();
    Shop.create({
        id: shopId, 
        name: faker.company.companyName(), 
        phone: faker.phone.phoneNumberFormat(), 
        city: faker.address.cityName(), 
        street: faker.address.streetAddress(), 
        postal: faker.address.zipCode(),
        logoId: logoId
    })
    return shopId;
}

async function fakeProduct(shopId) {
    const productId = uuidv4();
    Product.create({
        id: productId,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.float(),
        stock: faker.datatype.number({min: 1, max: 100}),
        shopId: shopId,
    });
    return productId;
}

async function fakeOrder(userId, productId) {
    const orderId = uuidv4();
    Order.create({
        id: orderId,
        quantities: faker.datatype.number({min: 1, max: 100}),
        number: uuidv4(),
        userId: userId,
        productId: productId
    });
    return orderId;
}

async function fakeTicket() {
    const ticketId = uuidv4();
    Ticket.create({

    });
    return ticketId;
}

async function fakeMessage() {
    const messageId = uuidv4();
    Message.create({

    });
    return messageId;
}