import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Role = sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    label: {
        type: Sequelize.STRING
    }
});

export default Role;