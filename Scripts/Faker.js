import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import ChalkMSG from '../Scripts/Chalk.js';
import { Shop, Product, Role, User, Order, Ticket, Message, OrderStatus, TicketStatus } from '../Models/Models.js';
import { rmStore, mkProduct, mkShop, mkUser } from '../Scripts/FileSystems.js';

faker.locale = "fr"; /* Usefull the get french faker values */

const fakeInit = async () => {
    const numTry = 50;
    await defaultDatas();
    for (let i = 0; i < numTry; i++) {
        var shopId = uuidv4();
        const n1 = faker.company.catchPhraseAdjective();
        const n2 = faker.company.bsNoun();
        await Shop.create({
            id: shopId,
            name: n1 + " " + n2,
            email: "service@" + n1 + "-" + n2 + ".fr",
            phone: faker.phone.phoneNumberFormat(),
            city: faker.address.cityName(),
            street: faker.address.streetAddress(),
            postal: faker.address.zipCode(),
            path: null,
            deleted: false
        });
        const productId = uuidv4();
        const productPrice = faker.datatype.float();
        await Product.create({
            id: productId,
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: productPrice,
            stock: faker.datatype.number({ min: 1, max: 100 }),
            path: '/default.svg',
            shopId: shopId,
            deleted: false
        })
            .then(() => {
                mkShop(shopId);
                mkProduct(productId, shopId);
            });
        const roleId = faker.datatype.number({ min: 1, max: 4 }).toString();
        const orderShopId = shopId;
        if (roleId != 3) {
            shopId = null;
        }
        const userId = uuidv4();
        const hashPassword = await bcrypt.hash("test", 10);
        const ln = faker.name.lastName();
        const fn = faker.name.firstName();
        let email = faker.internet.email(fn, ln);
        if (roleId === "1" || roleId === "2") { email = fn + "-" + ln + "@dragnreceive.fr" }
        else if (roleId === "3") { email = fn + "-" + ln + "@" + n1 + "-" + n2 + ".fr" }
        await User.create({
            id: userId,
            lastname: ln,
            firstname: fn,
            email: email,
            password: hashPassword,
            roleId: roleId,
            shopId: shopId
        })
            .then(() => {
                mkUser(userId);
            });

        const orderId = uuidv4();
        const orderQuantities = faker.datatype.number({ min: 1, max: 20 });
        if (roleId == "4") {
            await Order.create({
                id: orderId,
                quantities: orderQuantities,
                price: productPrice * orderQuantities,
                number: uuidv4(),
                userId: userId,
                productId: productId,
                shopId: orderShopId,
                orderStatusId: faker.datatype.number({ min: 1, max: 3 })
            });
        }
        const ticketId = uuidv4();
        if (roleId == "3" || roleId == "4") {
            await Ticket.create({
                id: ticketId,
                title: faker.lorem.sentence(4),
                content: faker.lorem.sentence(),
                userId: userId,
                ticketStatusId: faker.datatype.number({ min: 1, max: 2 })
            });
            for (let j = 0; j < 10; j++) {
                const messageId = uuidv4();
                await Message.create({
                    id: messageId,
                    content: faker.lorem.sentence(),
                    userId: userId,
                    ticketId: ticketId
                });
            }
        }
        console.log(`${ChalkMSG.SUCCESS}Row n??${i + 1} done !`);
    }
    console.log(`${ChalkMSG.SUCCESS}Fakes values are now inside your Database !`);
    process.exit();
}

/* Create the fakes standards values like status and roles and the standards users */
const defaultDatas = async () => {
    for (let i = 1; i < 5; i++) {
        mkUser(i);
        const hashedPassword = await bcrypt.hash("Password1@", 10);
        switch (i) {
            case 1:
                await Role.create({ id: i, label: "SUPERADMIN" });
                await User.create({ id: i, lastname: "Sadmin", firstname: "Sadmin", email: "sadmin@sadmin.sadmin", password: hashedPassword, roleId: i, shopId: null });
                await TicketStatus.create({ id: i, label: "Open" });
                await OrderStatus.create({ id: i, label: "Validate" });
                await OrderStatus.create({ id: i + 1, label: "In progress" });
                break;
            case 2:
                await Role.create({ id: i, label: "ADMIN" });
                await User.create({ id: i, lastname: "Admin", firstname: "Admin", email: "admin@admin.admin", password: hashedPassword, roleId: i, shopId: null });
                await TicketStatus.create({ id: i, label: "Close" });
                await OrderStatus.create({ id: i + 1, label: "Available" });
                break;
            case 3:
                const shopId = 'partner'
                const n1 = faker.company.catchPhraseAdjective();
                const n2 = faker.company.bsNoun();
                await Role.create({ id: i, label: "PARTNER" });
                await Shop.create({
                    id: shopId,
                    name: n1 + " " + n2,
                    email: "service@" + n1 + "-" + n2 + ".fr",
                    phone: faker.phone.phoneNumberFormat(),
                    city: faker.address.cityName(),
                    street: faker.address.streetAddress(),
                    postal: faker.address.zipCode(),
                    path: null,
                    deleted: false
                });
                for (let i = 0; i < 15; i++) {
                    const productId = uuidv4();
                    await Product.create({
                        id: productId,
                        name: faker.commerce.productName(),
                        description: faker.commerce.productDescription(),
                        price: faker.datatype.float(),
                        stock: faker.datatype.number({ min: 1, max: 100 }),
                        path: '/default.svg',
                        shopId: shopId,
                        deleted: false
                    })
                        .then(() => {
                            mkShop(shopId);
                            mkProduct(productId, shopId);
                        });
                }
                await User.create({ id: i, lastname: "Partner", firstname: "Partner", email: "partner@partner.partner", password: hashedPassword, roleId: i, shopId: shopId });
                await OrderStatus.create({ id: i + 1, label: "Collected" });
                break;
            case 4:
                await Role.create({ id: i, label: "CLIENT" });
                await User.create({ id: i, lastname: "Client", firstname: "Client", email: "client@client.client", password: hashedPassword, roleId: i, shopId: null });
                await OrderStatus.create({ id: i + 1, label: "Canceled" });
                await Product.create({
                    id: "product1",
                    name: "product1",
                    description: faker.commerce.productDescription(),
                    price: faker.datatype.float(),
                    stock: faker.datatype.number({ min: 1, max: 100 }),
                    path: '/default.svg',
                    shopId: "partner",
                    deleted: false
                })
                await Product.create({
                    id: "product2",
                    name: "product2",
                    description: faker.commerce.productDescription(),
                    price: faker.datatype.float(),
                    stock: faker.datatype.number({ min: 1, max: 100 }),
                    path: '/default.svg',
                    shopId: "partner",
                    deleted: false
                })
                await Product.create({
                    id: "product3",
                    name: "product3",
                    description: faker.commerce.productDescription(),
                    price: faker.datatype.float(),
                    stock: faker.datatype.number({ min: 1, max: 100 }),
                    path: '/default.svg',
                    shopId: "partner",
                    deleted: false
                })
                for (let i = 0; i < 30; i++) {
                    const number = uuidv4();
                    const orderStatusId = faker.datatype.number({ min: 1, max: 5 });
                    await Order.create({
                        id: uuidv4(),
                        quantities: faker.datatype.number({ min: 1, max: 20 }),
                        price: faker.datatype.number({ min: 1, max: 20 }) * faker.datatype.number({ min: 1, max: 20 }),
                        number: number,
                        userId: "4",
                        productId: "product1",
                        shopId: "partner",
                        orderStatusId: orderStatusId
                    });
                    await Order.create({
                        id: uuidv4(),
                        quantities: faker.datatype.number({ min: 1, max: 20 }),
                        price: faker.datatype.number({ min: 1, max: 20 }) * faker.datatype.number({ min: 1, max: 20 }),
                        number: number,
                        userId: "4",
                        productId: "product2",
                        shopId: "partner",
                        orderStatusId: orderStatusId
                    });
                    await Order.create({
                        id: uuidv4(),
                        quantities: faker.datatype.number({ min: 1, max: 20 }),
                        price: faker.datatype.number({ min: 1, max: 20 }) * faker.datatype.number({ min: 1, max: 20 }),
                        number: number,
                        userId: "4",
                        productId: "product3",
                        shopId: "partner",
                        orderStatusId: orderStatusId
                    });
                    await Ticket.create({
                        id: uuidv4(),
                        title: faker.lorem.sentence(4),
                        content: faker.lorem.sentence(),
                        userId: "4",
                        ticketStatusId: faker.datatype.number({ min: 1, max: 2 })
                    });
                }
                break;
        }
    }
    console.log(`${ChalkMSG.SUCCESS}Default datas created !`);
}

try {
    console.log(`${ChalkMSG.INFO}Faker script is running...`);
    rmStore();
    fakeInit();
} catch (error) {
    console.log(`${ChalkMSG.ERROR}${error}`);
}