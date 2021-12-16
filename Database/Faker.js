import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

faker.locale = "fr";

let fakerLogos = [];
let fakerShops = [];
let fakerProducts = [];
let fakerRoles = [];
let fakerDefaultUsers = [];
let fakerUsers = [];
let fakerOrders = [];
let fakerTickets = [];
let fakerMessages = [];

for (let i = 1; i < 11; i++) {
    let shopId = uuidv4();
    let roleId = faker.datatype.number({min: 1, max: 4});
    let userId = uuidv4();
    let productId = uuidv4();

    let logo = { 

    };
    fakerLogos[i] = logo;

    let shop = {
        id: shopId, 
        name: faker.company.companyName(), 
        phone: faker.phone.phoneNumberFormat(), 
        city: faker.address.cityName(), 
        street: faker.address.streetAddress(), 
        postal: faker.address.zipCode(),
        logoId: null
    };
    fakerShops[i] = shop;

    let product = {
        id: productId,
        name: "",
        description: "",
        price: 2,
        stock: 5,
        shopId: shopId,
    };
    fakerProducts[i] = product;

    if (roleId !== 3) {
        shopId = null;
    }

    let user = {
        id: userId,
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        roleId: roleId,
        shopId: shopId
    };
    fakerUsers[i] = user;

    let order = {

    };
    fakerOrders[i] = order;

    let ticket = {

    };
    fakerTickets[i] = ticket;

    let message = {

    };
    fakerMessages[i] = message;
}
fakerRoles = [
    { id: "1", label: "SUPERADMIN" }, 
    { id: "2", label: "ADMIN" }, 
    { id: "3", label: "PARTNER" }, 
    { id: "4", label: "USER" }
];
// Hash the password
const hashedSadmin = await bcrypt.hash("sadmin", 10);
const hashedAdmin = await bcrypt.hash("admin", 10);
const hashedPartner = await bcrypt.hash("partner", 10);
const hashedUser = await bcrypt.hash("user", 10);
fakerDefaultUsers = [
    { id: '1', lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: "1", shopId: null },
    { id: '2', lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: "2", shopId: null },
    { id: '3', lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: "3", shopId: null },
    { id: '4', lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: "4", shopId: null }
];

export const logos = fakerLogos;
export const shops = fakerShops;
export const products = fakerProducts;
export const roles = fakerRoles;
export const defaultUsers = fakerDefaultUsers;
export const users = fakerUsers;
export const orders = fakerOrders;
export const tickets = fakerTickets;
export const messages = fakerMessages;

export default { logos, shops, products, roles, defaultUsers, users, orders, tickets, messages };