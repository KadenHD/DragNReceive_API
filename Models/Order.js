import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    quantities: {
        type: Sequelize.INTEGER
    },
    number: {
        type: Sequelize.STRING
    }
});

export default Order;