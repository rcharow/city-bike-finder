var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var stations = require('./routes/stations')

var app = express()
module.exports = app

var publicPath = path.join(__dirname, '../public')

var indexHtmlPath = path.join(__dirname, '../index.html')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use('/bower_components',express.static(path.join(__dirname,'../bower_components')))
app.use('/stations',stations)

app.get('/', function (req, res) {
	console.log("PUBLIC",publicPath)
    res.sendFile(indexHtmlPath);
});