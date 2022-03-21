import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import ip from 'ip';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config(); /* Add the variables from .env file to process.env */

import router from './Routes/Routes.js';

const app = express();

app.use(express.json()); /* For JSON requests */
app.use(express.static('Store')); /* Can access the store folder from url's */
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload()); /* Can use files like pictures and pdf from requests */
app.use(cors());

app.use('/api', router); /* Init the whole routes */

var port = process.env.PORT || 3000;

export default
    app.listen(port, () => console.log(`
    ${chalk.blue('App running at')} :
        - ${chalk.yellow('Local')} :   ${chalk.bgGray(`http://${process.env.BASE_URL}:${port}`)}
        - ${chalk.magenta('Network')} : ${chalk.bgGray(`http://${ip.address()}:${port}`)}
    `));
