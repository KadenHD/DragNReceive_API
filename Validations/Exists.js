import { User, Shop, Role, Ticket } from '../Models/Models.js';

export const emailExist = (key) => {
    return (
        User.findOne({ where: { email: key } }) ||
        Shop.findOne({ where: { email: key } })
    );
}

export const shopExist = (key) => {
    return Shop.findByPk(key);
}

export const roleExist = (key) => {
    return Role.findByPk(key);
}

export const ticketExist = (key) => {
    return Ticket.findByPk(key);
}

export const nameExist = (key) => {
    return Shop.findOne({ where: { name: key } })
}

export const phoneExist = (key) => {
    return Shop.findOne({ where: { phone: key } })
}