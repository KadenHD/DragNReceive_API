import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";
import Role from "./Role.js";

const User = sequelize.define("user", {
    id: {
        type: Sequelize.STRING,
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
User.belongsTo(Role);
Role.hasMany(User);

export default User;