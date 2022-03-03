import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const orderStatus = sequelize.define("orderStatus", {
    id: {
        type: Sequelize.STRING(1),
        primaryKey: true
    },
    label: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
});

export default orderStatus;