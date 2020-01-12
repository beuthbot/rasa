var express = require('express');
var apiRouter = require('./routes/api');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/api', apiRouter);

module.exports = app;
