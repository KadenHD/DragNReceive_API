import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Shop = sequelize.define("shop", {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(10),
        allowNull: true
    },
    city: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    street: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    postal: {
        type: Sequelize.INTEGER(5),
        allowNull: true
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});

export default Shop;