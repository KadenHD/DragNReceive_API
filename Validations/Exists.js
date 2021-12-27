import { User, Shop, Role } from '../Models/Models.js';

export const userExist = (key) => {
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