var express = require('express');
var config = require('./config');
var Authcontroller = require('./controllers/authentication');
var dbObj = require('./DAL/db');

var authroutes = express.Router();
let authObj = new Authcontroller();
authroutes.post('/signup', (req, res) => {
    authObj.signup(req, res);
});
authroutes.post('/login', (req, res) => {
    authObj.login(req, res);
});


var userroutes = express.Router();
userroutes.get('/:userid', (req, res) => {
    dbObj.Users.getUser(req, res);
});
userroutes.get('/', function (req, res) {
    dbObj.Users.getAllUsers(req, res);
});


var messageroutes = express.Router();
messageroutes.get('/:sender/:reciever', function (req, res) {
    dbObj.Messages.getMessages(req, res);
});

messageroutes.post('/', function (req, res) {
    dbObj.Messages.sendMessage(req, res);


    try {
        let msgObj = req.body;
        console.log('Request recieved for sending message. MessageObj : ' + JSON.stringify(msgObj));
        //using existing mongodb connection and adding new user
        dbObj.Messages.sendMessage(msgObj)
            .then((responsedata) => {
                console.log('Message sent successfully. MessageObj : ' + JSON.stringify(msgObj));
                res.send(responsedata);
            })
            .catch((err) => {
                console.error(logmsg.genericmessage + err.stack);
                res.send(logmsg.genericmessage);
            })
    }
    catch (err) {
        console.error(logmsg.genericmessage + err.stack);
        res.send(logmsg.genericmessage);
    }
});

//export this router to use in our index.js
module.exports = {
    userroutes: userroutes,
    messageroutes: messageroutes,
    authroutes: authroutes
};