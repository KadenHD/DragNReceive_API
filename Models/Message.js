import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Message = sequelize.define("message", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

export default Message;