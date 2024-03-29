require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('./models/connection');

const tripsRouter = require('./routes/trips');
const bookingsRouter = require('./routes/bookings');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', tripsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
