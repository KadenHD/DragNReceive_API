import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Role = sequelize.define("role", {
    id: {
        type: Sequelize.STRING(1),
        primaryKey: true
    },
    label: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
});

export default Role;