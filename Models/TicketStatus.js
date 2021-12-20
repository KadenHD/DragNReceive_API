import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Role = sequelize.define("ticketStatus", {
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