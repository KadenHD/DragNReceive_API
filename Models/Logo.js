import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Logo = sequelize.define("logo", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    size: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    type: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    bin: {
        type: Sequelize.BLOB,
        allowNull: false
    }
});

export default Logo;