var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

var signInRouter = require('./routes/signIn');
var participantRouter = require('./routes/participant');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 
dotenv.config();

const url = 'mongodb://localhost:27017';
 

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
	if (err) {
		throw err;
	} else {
        console.log("Connected");
        global.dbo = db.db('Stage3');
    }
});


app.use('/users', signInRouter);
app.use('/participants', participantRouter);


module.exports = app;
 