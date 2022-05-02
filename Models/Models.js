import User from './User.js';
import Role from './Role.js';
import Ticket from './Ticket.js';
import Message from './Message.js';
import Shop from './Shop.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderStatus from './OrderStatus.js';
import TicketStatus from './TicketStatus.js';
import WebToken from './WebToken.js';
import MobileCode from './MobileCode.js';
import Favoris from './Favoris.js'

/* All the relations, FK and constraints from Models */


/* Favoris <-> Ticket */
Favoris.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Favoris);

/* Favoris <-> Shop */
Favoris.belongsTo(Shop, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Shop.hasMany(Favoris);

/* User <-> WebToken */
WebToken.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasOne(WebToken);

/* User <-> MobileCode */
MobileCode.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasOne(MobileCode);

/* User <-> Role */
User.belongsTo(Role, {
    foreignKey: {
        allowNull: false
    }
});
Role.hasMany(User);

/* User <-> Shop */
User.belongsTo(Shop, {
    foreignKey: {
        allowNull: true
    }
});
Shop.hasMany(User);

/* Ticket <-> User */
Ticket.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Ticket);

/* Message <-> User */
Message.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Message);

/* Message <-> Ticket */
Message.belongsTo(Ticket, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Ticket.hasMany(Message);

/* Product <-> Shop */
Product.belongsTo(Shop, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Shop.hasMany(Product);

/* Order <-> User */
Order.belongsTo(User, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
User.hasMany(Order);

/* Order <-> Product */
Order.belongsTo(Product, {
    foreignKey: {
        allowNull: false
    }
});
Product.hasMany(Order);

Order.belongsTo(Shop, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Shop.hasMany(Order);

/* Order <-> OrderStatus */
Order.belongsTo(OrderStatus, {
    foreignKey: {
        allowNull: false
    }
});
OrderStatus.hasMany(Order);

/* Ticket <-> TicketStatus */
Ticket.belongsTo(TicketStatus, {
    foreignKey: {
        allowNull: false
    }
});
TicketStatus.hasMany(Ticket);

export { User, Role, Ticket, Message, Shop, Product, Order, OrderStatus, TicketStatus, WebToken, MobileCode, Favoris };