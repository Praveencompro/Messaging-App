var express = require('express');
var app = express();
var users = require('./user.js');
var messages = require('./message.js');
var config = require('./config.js');
var MongoClient = require('mongodb').MongoClient;

app.use('/users', users);
app.use('/messages', messages);

var db;

MongoClient.connect(config.database.mongodb.url, { promiseLibrary: Promise }, (err, dbconn) => {
    if (err) {
        console.log(`Failed to connect to the database. ${err.stack}`);
    }
    db = dbconn;
    app.listen(config.appsettings.port, () => {
    });
});