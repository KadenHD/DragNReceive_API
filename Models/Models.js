import User from '../Models/User.js';
import Role from '../Models/Role.js';
import Ticket from '../Models/Ticket.js';
import Message from '../Models/Message.js';
import Shop from '../Models/Shop.js';
import Product from '../Models/Product.js';
import Order from '../Models/Order.js';
import OrderStatus from '../Models/OrderStatus.js';
import TicketStatus from '../Models/TicketStatus.js';

// All the relations, FK and constraints from Models

// User <-> Role
User.belongsTo(Role);
Role.hasMany(User, {
    foreignKey: {
        allowNull: false
    }
});

// User <-> Shop
User.belongsTo(Shop);
Shop.hasMany(User, {
    foreignKey: {
        allowNull: true
    }
});

// Ticket <-> User
Ticket.belongsTo(User);
User.hasMany(Ticket, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

// Message <-> User
Message.belongsTo(User);
User.hasMany(Message, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

// Message <-> Ticket
Message.belongsTo(Ticket);
Ticket.hasMany(Message, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

// Product <-> Shop
Product.belongsTo(Shop);
Shop.hasMany(Product, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

// Order <-> User
Order.belongsTo(User);
User.hasMany(Order, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

// Order <-> Product
Order.belongsTo(Product);
Product.hasMany(Order, {
    foreignKey: {
        allowNull: false
    }
});

// Order <-> OrderStatus
Order.belongsTo(OrderStatus);
OrderStatus.hasMany(Order, {
    foreignKey: {
        allowNull: false
    }
});

// Ticket <-> TicketStatus
Ticket.belongsTo(TicketStatus);
TicketStatus.hasMany(Ticket, {
    foreignKey: {
        allowNull: false
    }
});

export { User, Role, Ticket, Message, Shop, Product, Order, OrderStatus, TicketStatus };