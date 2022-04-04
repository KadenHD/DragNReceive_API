import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const MobileCode = sequelize.define("mobileCode", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING(4),
        allowNull: false
    },
});

export default MobileCode;