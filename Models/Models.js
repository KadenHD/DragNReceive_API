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
    }
});
User.hasMany(Ticket, {
    onDelete: 'CASCADE'
});

// Message <-> User
Message.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});
User.hasMany(Message, {
    onDelete: 'CASCADE'
});

// Message <-> Ticket
Message.belongsTo(Ticket, {
    foreignKey: {
        allowNull: false
    }
});
Ticket.hasMany(Message, {
    onDelete: 'CASCADE'
});

// Product <-> Shop
Product.belongsTo(Shop, {
    foreignKey: {
        allowNull: false
    }
});
Shop.hasMany(Product, {
    onDelete: 'CASCADE'
});

// Order <-> User
Order.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});
User.hasMany(Order, {
    onDelete: 'CASCADE'
});

// Order <-> Product
Order.belongsTo(Product, {
    foreignKey: {
        allowNull: false
    }
});
Product.hasMany(Order);

// Order <-> OrderStatus
Order.belongsTo(OrderStatus, {
    foreignKey: {
        allowNull: false
    }
});
OrderStatus.hasMany(Order);

// Ticket <-> TicketStatus
Ticket.belongsTo(TicketStatus, {
    foreignKey: {
        allowNull: false
    }
});
TicketStatus.hasMany(Ticket);

export { User, Role, Ticket, Message, Shop, Product, Order, OrderStatus, TicketStatus };