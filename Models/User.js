import Sequelize from "sequelize";

import sequelize from "../Configs/Database.js";

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastname: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

export default User;