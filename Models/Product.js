import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT({}, 2),
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

export default Product;