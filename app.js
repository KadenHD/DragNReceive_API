import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import router from './Routes/Routes.js';

dotenv.config(); // add the variables from .env to process.env

const app = express();

app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running at :\n - Local : ${process.env.BASE_URL}:${port}`));
