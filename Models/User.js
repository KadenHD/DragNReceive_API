import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const User = sequelize.define("user", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    lastname: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
});

export default User;