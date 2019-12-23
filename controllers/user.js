var config = require('./../config');
var logmsg = require("./../logmessages");

class User {
    constructor(db) {
        this.collection = db.collection(config.database.mongodb.dbschema.usercollname);
    }

    getUser(req, res) {
        try {
            let emailid = req.params.userid;
            console.log('Request recieved for getting user data. EmailID : ' + emailid);
            this.getUserByEmailId(emailid).then((user)=>{
                res.send(user);
            })            
        }
        catch (err) {
            console.error(logmsg.genericmessage + err.stack);
            let responseObj = { message: logmsg.genericmessage }
            res.send(responseObj);
        }
    }

    getUserByEmailId(emailid) {
        return new Promise((res, rej) => {
            console.log('Request recieved for getting user data. EmailID : ' + emailid);
            var query = { emailid };
            var qprojection = { 'password': 0 };
            this.collection.find(query, { projection: qprojection }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res(result);
            });
        })
    }

    getAllUsers(req, res) {
        try {
            var query = {};
            var qprojection = { 'password': 0 };
            this.collection.find(query, { projection: qprojection }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        }
        catch (err) {
            console.error(logmsg.genericmessage + err.stack);
            let responseObj = { message: logmsg.genericmessage }
            res.send(responseObj);
        }
    }

    addUser(user) {
        return new Promise((resolve, reject) => {
            let emailID = user.emailid;
            this.getUserByEmailId(emailID).then((result) => {
                if (result && result.length > 0) {
                    let msg = 'EmailId already registered with another user.';
                    console.warn(msg + ' EmailID : ' + emailID);
                    reject(new Error(msg));
                }
                else {
                    this.collection.insertOne(user);
                    let msg = 'User added successfully.';
                    console.log(msg + ' EmailID : ' + emailID);
                    resolve(msg);
                }
            })
        })
    }
}

module.exports = User;