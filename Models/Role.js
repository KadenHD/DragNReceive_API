import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Role = sequelize.define("role", {
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