import bcrypt from 'bcrypt';

export const logos = [
    {},
];

export const shops = [
    { id: "1", name: "TurboShop", phone:"0344856991", city:"Compiègne", street:"8 rue de ta soeur l'andouille", postal:"60200", logoId: null},
];

export const products = [
    {},
];

export const roles = [
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
export const users = [
    { id: "1", lastname: "sadmin", firstname: "sadmin", email: "sadmin@sadmin.sadmin", password: hashedSadmin, roleId: "1", shopId: null },
    { id: "2", lastname: "admin", firstname: "admin", email: "admin@admin.admin", password: hashedAdmin, roleId: "2", shopId: null },
    { id: "3", lastname: "partner", firstname: "partner", email: "partner@partner.partner", password: hashedPartner, roleId: "3", shopId: "1" },
    { id: "4", lastname: "user", firstname: "user", email: "user@user.user", password: hashedUser, roleId: "4", shopId: null }
];

export const orders = [
    {},
];

export const tickets = [
    {},
];

export const messages = [
    {},
];

export default { logos, shops, products, roles, users, orders, tickets, messages };