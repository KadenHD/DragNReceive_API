import Sequelize from "sequelize";

import sequelize from "../Configs/Database.js";

const Role = sequelize.define("role", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    label: {
        type: Sequelize.STRING
    }
});

export default Role;