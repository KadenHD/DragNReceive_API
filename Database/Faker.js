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
        const logos = [
            "android.png",
            "burger.png",
            "camera.png",
            "coffee.png",
            "email.png",
            "hella.png",
            "instagram.png",
            "python.png",
            "twitter.png",
            "windows.png"
        ]
        const logoId = uuidv4();
        Logo.create({
            id: logoId,
            path: "../Store/Logo/"+logos[i]
        });
        const shopId = uuidv4();
        const n1 = faker.company.catchPhraseAdjective();
        const n2 = faker.company.bsNoun();
        await Shop.create({
            id: shopId, 
            name: n1+" "+n2,
            email: "service@"+n1+"-"+n2+".fr", 
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
        const ln = faker.name.lastName();
        const fn = faker.name.firstName();
        await User.create({ 
            id: userId,
            lastname: ln,
            firstname: fn,
            email: faker.internet.email(fn, ln),
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