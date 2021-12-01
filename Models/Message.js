import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Message = sequelize.define("message", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING
    }
});

export default Message;