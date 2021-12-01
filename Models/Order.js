import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    quantities: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Order;