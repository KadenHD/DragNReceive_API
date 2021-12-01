import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Ticket = sequelize.define("ticket", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Ticket;