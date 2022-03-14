import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
/* Initialize Sequelize with parameters */
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        timezone: '+01:00',
        dialect: process.env.DB_DIAL,
        host: process.env.DB_HOST,
        logging: false /* Uncomment while on prod (avoid consolelog db requests) */
    }
);

export default sequelize;