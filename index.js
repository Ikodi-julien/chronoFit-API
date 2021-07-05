const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = require('./app/router');
// Enables CORS
const cors = require('cors');
/*------------------------*/
const app = express();

/*------------------------*/
app.use(cors('*'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// TODO Prévoir le middleware sanitizer de variables ?
app.use(router);

/*------------------------*/
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => console.log(`http://localhost:${PORT || 5000}`))