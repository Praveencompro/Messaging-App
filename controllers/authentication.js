var config =  require("./../config");
var logmsg = require("./../logmessages");
var dbObj = require('./../DAL/db');
const jwt = require('jsonwebtoken');

class Authentication {
    constructor() {

    }

    signup(req, res) {
        try {
            let userdata = req.body;
            console.log('Request recieved for creating new user. Data : ' + JSON.stringify(userdata));
            //using existing mongodb connection and adding new user
            dbObj.Users.addUser(userdata)
                .then((responsedata) => {
                    console.log('User created successfully. Data : ' + JSON.stringify(userdata));
                    var token = jwt.sign({ userID: userdata.emailId }, config.appsettings.jwttoken, { expiresIn: '2h' });
                    let responseObj = { message: responsedata, jwttoken: token }
                    res.send(responseObj);
                })
                .catch((err) => {
                    console.error(logmsg.genericmessage + err.stack);
                    let errorMsg = err.message ? err.message : logmsg.genericmessage;
                    let responseObj = { message: errorMsg }
                    res.send(responseObj);
                })
        }
        catch (err) {
            console.error(logmsg.genericmessage + err.stack);
            res.send(logmsg.genericmessage);
        }
    }

    login(req, res) {
        try {
            let userdata = req.body;
            console.log('Request recieved for creating new user. Data : ' + JSON.stringify(userdata));
            //using existing mongodb connection and adding new user
            dbObj.Users.addUser(userdata)
                .then((responsedata) => {
                    console.log('User created successfully. Data : ' + JSON.stringify(userdata));
                    var token = jwt.sign({ userID: userdata.emailId }, config.appsettings.jwttoken, { expiresIn: '2h' });
                    let responseObj = { message: responsedata, jwttoken: token }
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
    }
}

module.exports = Authentication;