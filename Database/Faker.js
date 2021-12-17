import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { Logo, Shop, Product, Role, User, Order, Ticket, Message } from '../Models/Models.js';

faker.locale = "fr";

try {
    fakeInit();
} catch (error) {
    console.log(error);
} finally {
    console.log("DataBase instance and fake values created !");
}

async function fakeInit() {
    await defaultUsers();
    for(let i = 0; i<10 ; i++) {
        const logoId = null
        /*uuidv4();
        Logo.create({
            id: logoId,
            name: "",
            size: "",
            type: "",
            bin: ""
        });
        */
        const shopId = uuidv4();
        await Shop.create({
            id: shopId, 
            name: faker.company.companyName(), 
            phone: faker.phone.phoneNumberFormat(), 
            city: faker.address.cityName(), 
            street: faker.address.streetAddress(), 
            postal: faker.address.zipCode(),
            logoId: logoId
        });
        const productId = uuidv4();
        await Product.create({
            id: productId,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.datatype.float(),
            stock: faker.datatype.number({min: 1, max: 100}),
            shopId: shopId,
        });
        const roleId = faker.datatype.number({min: 1, max: 4}).toString();
        const userId = uuidv4();
        const hashPassword = await bcrypt.hash("test", 10);
        await User.create({ 
            id: userId,
            lastname: faker.name.lastName(),
            firstname: faker.name.firstName(),
            email: faker.internet.email(),
            password: hashPassword,
            roleId: roleId,
            shopId: shopId 
        });
        const orderId = uuidv4();
        await Order.create({
            id: orderId,
            quantities: faker.datatype.number({min: 1, max: 100}),
            number: uuidv4(),
            userId: userId,
            productId: productId
        });
        const ticketId = uuidv4();
        await Ticket.create({
            id: ticketId,
            title: faker.lorem.sentence(),
            content:faker.lorem.sentence(),
            userId: userId
        });
        const messageId = uuidv4();
        await Message.create({
            id: messageId,
            content: faker.lorem.sentence(),
            userId: userId,
            ticketId: ticketId
        });
    }
}

//Create the fakes standards users
async function defaultUsers() {
    for(let i = 1; i<5 ; i++) {
        switch (i) {
            case 1:
                const hashedSadmin = await bcrypt.hash("sadmin", 10);
                await Role.create({ id: i, label: "SUPERADMIN" });
                await User.create({ id: i, lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: i, shopId: null });
                break;
            case 2:
                const hashedAdmin = await bcrypt.hash("admin", 10);
                await Role.create({ id: i, label: "ADMIN" });
                await User.create({ id: i, lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: i, shopId: null });
                break;
            case 3:
                const hashedPartner = await bcrypt.hash("partner", 10);
                await Role.create({ id: i, label: "PARTNER" });
                await User.create({ id: i, lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: i, shopId: null });
                break;
            case 4:
                const hashedUser = await bcrypt.hash("user", 10);
                await Role.create({ id: i, label: "USER" });
                await User.create({ id: i, lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: i, shopId: null });
                break;
        }
    }
}