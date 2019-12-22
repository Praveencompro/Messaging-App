var express = require('express');
var dbObj = require('./DAL/db');
var logmsg = require('./logmessages')
var config = require('./config')
const jwt = require('jsonwebtoken');

var userroutes = express.Router();
/*
    Request for adding a user in the system
*/
userroutes.post('/', function (req, res) {
    try {
        let userdata = req.body;
        console.log('Request recieved for creating new user. Data : ' + JSON.stringify(userdata));
        //using existing mongodb connection and adding new user
        dbObj.Users.addUser(userdata)
            .then((responsedata) => {
                console.log('User created successfully. Data : ' + JSON.stringify(userdata));
                var token = jwt.sign({ userID: userdata.emailId }, config.appsettings.jwttoken, { expiresIn: '2h' });
                let responseObj = { message: responsedata, jwttoken: token}
                res.send(responseObj);
            })
            .catch((err) => {
                console.error(logmsg.genericmessage + err.stack);
                let responseObj = { message: logmsg.genericmessage }
                res.send(responseObj);
            })
    }
    catch (err) {
        console.error(logmsg.genericmessage + err.stack);
        res.send(logmsg.genericmessage);
    }
});

/*
    Request for getting a user from DB
    /all will be passed in the id to get list of all the users    
*/
userroutes.get('/:userid', function (req, res) {
    try {
        let emailId = req.params.userid;
        console.log('Request recieved for getting user data. EmailID : ' + emailId);
        dbObj.Users.getUserByEmailId(emailId)
            .then((result) => {
                console.log('User data recieved successfully. EmailID : ' + emailId);
                res.send(result);
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

/*
    Request for getting a user from DB
    /all will be passed in the id to get list of all the users    
*/
userroutes.get('/', function (req, res) {
    try {
        console.log('Request recieved for getting all users data.');
        dbObj.Users.getAllUsers()
            .then((result) => {
                console.log('User data recieved successfully.');
                res.send(result);
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


var messageroutes = express.Router();

messageroutes.get('/:sender/:reciever', function (req, res) {
    try {
        let sender = req.params.sender;
        let reciever = req.params.reciever;
        console.log('Request recieved for getting messages. sender : ' + sender + ', reciever : ' + reciever);
        dbObj.Messages.getMessages(sender, reciever)
            .then((result) => {
                console.log('Messages fetched successfully. sender : ' + sender + ', reciever : ' + reciever);
                res.send(result);
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

messageroutes.post('/', function (req, res) {
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
    messageroutes: messageroutes
};