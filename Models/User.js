import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const User = sequelize.define("user", {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    lastname: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(),
        allowNull: false
    }
});

export default User;