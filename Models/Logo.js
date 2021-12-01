import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Logo = sequelize.define("logo", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100)
    },
    size: {
        type: Sequelize.INTEGER(11)
    },
    type: {
        type: Sequelize.STRING(20)
    },
    bin: {
        type: Sequelize.BLOB
    }
});

export default Logo;