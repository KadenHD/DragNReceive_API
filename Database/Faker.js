import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { Logo, Shop, Product, Role, User, Order, Ticket, Message, OrderStatus, TicketStatus } from '../Models/Models.js';

faker.locale = "fr";

try {
    fakeInit();
} catch (error) {
    console.log(error);
}

async function fakeInit() {
    await defaultDatas();
    for (let i = 0; i < 10; i++) {
        let logoId = uuidv4();
        Logo.create({
            id: logoId,
            path: "../Store/Default/Companies/Logo/" + "default.png"
        });
        let shopId = uuidv4();
        let n1 = faker.company.catchPhraseAdjective();
        let n2 = faker.company.bsNoun();
        await Shop.create({
            id: shopId,
            name: n1 + " " + n2,
            email: "service@" + n1 + "-" + n2 + ".fr",
            phone: faker.phone.phoneNumberFormat(),
            city: faker.address.cityName(),
            street: faker.address.streetAddress(),
            postal: faker.address.zipCode(),
            logoId: logoId
        });
        let productId = uuidv4();
        let productPrice = faker.datatype.float();
        await Product.create({
            id: productId,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: productPrice,
            stock: faker.datatype.number({ min: 1, max: 100 }),
            path: "../Store/Default/Companies/Products/" + "default.png",
            shopId: shopId,
        });
        let roleId = faker.datatype.number({ min: 1, max: 4 }).toString();
        if (roleId != 3) {
            shopId = null;
        }
        let userId = uuidv4();
        let hashPassword = await bcrypt.hash("test", 10);
        let ln = faker.name.lastName();
        let fn = faker.name.firstName();
        await User.create({
            id: userId,
            lastname: ln,
            firstname: fn,
            email: faker.internet.email(fn, ln),
            password: hashPassword,
            roleId: roleId,
            shopId: shopId
        });
        let orderId = uuidv4();
        let orderQuantities = faker.datatype.number({ min: 1, max: 20 });
        await Order.create({
            id: orderId,
            quantities: orderQuantities,
            price: productPrice * orderQuantities,
            number: uuidv4(),
            userId: userId,
            productId: productId,
            orderStatusId: faker.datatype.number({ min: 1, max: 3 })
        });
        let ticketId = uuidv4();
        await Ticket.create({
            id: ticketId,
            title: faker.lorem.sentence(),
            content: faker.lorem.sentence(),
            inProgress: faker.datatype.boolean(),
            userId: userId,
            ticketStatusId: faker.datatype.number({ min: 1, max: 2 })
        });
        for (let j = 0; j < 10; j++) {
            let messageId = uuidv4();
            await Message.create({
                id: messageId,
                content: faker.lorem.sentence(),
                userId: userId,
                ticketId: ticketId
            });
        }
    }
    process.exit();
}

//Create the fakes standards users
async function defaultDatas() {
    for (let i = 1; i < 5; i++) {
        switch (i) {
            case 1:
                let hashedSadmin = await bcrypt.hash("sadmin", 10);
                await Role.create({ id: i, label: "SUPERADMIN" });
                await User.create({ id: i, lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: i, shopId: null });
                await TicketStatus.create({ id: i, label: "In progress" });
                await OrderStatus.create({ id: i, label: "In progress" });
                break;
            case 2:
                let hashedAdmin = await bcrypt.hash("admin", 10);
                await Role.create({ id: i, label: "ADMIN" });
                await User.create({ id: i, lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: i, shopId: null });
                await TicketStatus.create({ id: i, label: "Close" });
                await OrderStatus.create({ id: i, label: "Available" });
                break;
            case 3:
                let hashedPartner = await bcrypt.hash("partner", 10);
                await Role.create({ id: i, label: "PARTNER" });
                await User.create({ id: i, lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: i, shopId: null });
                await OrderStatus.create({ id: i, label: "Collected" });
                break;
            case 4:
                let hashedUser = await bcrypt.hash("user", 10);
                await Role.create({ id: i, label: "USER" });
                await User.create({ id: i, lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: i, shopId: null });
                break;
        }
    }
}