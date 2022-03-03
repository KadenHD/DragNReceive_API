import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const WebToken = sequelize.define("webToken", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
});

export default WebToken;