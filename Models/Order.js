import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    quantities: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT({}, 2),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

export default Order;