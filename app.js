var createError = require('http-errors');
var express = require('express');
const maogoose = require('mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');

var app = express();

//env file configuration.
require('dotenv').config();
//Database Connection...
require('./config/db')();
// maogoose.connect("mongodb+srv://zain:troon@cluster0.drlvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useUnifiedTopology: true, useNewUrlParser:true}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);


module.exports = app;
