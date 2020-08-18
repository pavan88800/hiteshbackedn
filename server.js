const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const ConnectDB = require('./config/db');
require('dotenv').config();

const Port = process.env.PORT || 5000;
// DataBase connection
ConnectDB();
// Middleware;
// parse application/json
app.use(bodyParser.json());
// cookieParse
app.use(cookieParser());
// cors
app.use(cors());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/category'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/order'));
app.listen(Port, () => {
	console.log(`Server is runing on ${Port}`.inverse);
});
