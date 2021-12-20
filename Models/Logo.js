import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Logo = sequelize.define("logo", {
    id: {
        type: Sequelize.STRING(),
        primaryKey: true
    },
    path: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
});

export default Logo;