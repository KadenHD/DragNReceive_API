import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import ip from 'ip';

import router from './Routes/Routes.js';

dotenv.config(); /* Add the variables from .env file to process.env */

const app = express();

app.use(express.json()); /* For JSON requests */
app.use(express.static('Store'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload()); /* Can use files like pictures and pdf from requests */
app.use(cors());

app.use('/api', router); /* Init the whole routes */

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running at :
    - Local :   http://${process.env.BASE_URL}:${port}
    - Network : http://${ip.address()}:${port}`
));