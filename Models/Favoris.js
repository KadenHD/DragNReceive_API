import Sequelize from "sequelize";

import sequelize from "../Database/DBConfig.js";

const Favoris = sequelize.define("favoris", {
    id: {
        type: Sequelize.STRING(36),
        primaryKey: true
    },
});

export default Favoris;