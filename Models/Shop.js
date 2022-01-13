import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Shop = sequelize.define("shop", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    city: {
        type: Sequelize.STRING(60),
        allowNull: true
    },
    street: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    postal: {
        type: Sequelize.INTEGER(5),
        allowNull: true
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    deleted: {
        type: Sequelize.BOOLEAN(),
        allowNull: false
    }
});

export default Shop;