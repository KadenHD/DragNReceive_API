import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Ticket = sequelize.define("ticket", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
});

export default Ticket;