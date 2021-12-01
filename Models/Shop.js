import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Shop = sequelize.define("shop", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING(10)
    },
    city: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    postal: {
        type: Sequelize.INTEGER(5)
    }
});

export default Shop;