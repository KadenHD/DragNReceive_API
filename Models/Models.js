import User from '../Models/User.js';
import Role from '../Models/Role.js';
import Ticket from '../Models/Ticket.js';
import Message from '../Models/Message.js';
import Shop from '../Models/Shop.js';
import Product from '../Models/Product.js';
import Logo from '../Models/Logo.js';
import Order from '../Models/Order.js';

// User <-> Role
User.belongsTo(Role, {
    foreignKey: {       
        allowNull: false
    }       
});
Role.hasMany(User);

// User <-> Shop
User.belongsTo(Shop, {
    foreignKey: {
        allowNull: true
    }
});
Shop.hasMany(User);

// Ticket <-> User
Ticket.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Ticket);

// Message <-> User
Message.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});
User.hasMany(Message);

// Message <-> Ticket
Message.belongsTo(Ticket, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Ticket.hasMany(Message);

// Shop <-> Logo
Shop.belongsTo(Logo);
Logo.hasOne(Shop);

// Product <-> Shop
Product.belongsTo(Shop, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Shop.hasMany(Product);

// Order <-> User
Order.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});
User.hasMany(Order);

// Order <-> Product
Order.belongsTo(Product, {
    foreignKey: {
        allowNull: false
    }
});
Product.hasMany(Order);

export { User, Role, Ticket, Message, Shop, Product, Logo, Order };