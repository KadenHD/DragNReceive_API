import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Ticket = sequelize.define("ticket", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

export default Ticket;