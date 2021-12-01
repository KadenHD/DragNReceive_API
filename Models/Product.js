import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    stock: {
        type: Sequelize.INTEGER
    }
});

export default Product;