import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Role = sequelize.define("orderStatus", {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    label: {
        type: Sequelize.STRING(),
        allowNull: false
    }
});

export default Role;