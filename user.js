var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config.js');
var dbutils = require('./DAL/db.js');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/*
    Request for adding a user in the system
*/
router.post('/', urlencodedParser, function (req, res) {
    res.send('add user req recieved');
    let userdata = req.body;
    //using existing mongodb connection and adding new user
    dbutils.addUser(req);
});

/*
    Request for getting a user from DB
    /all will be passed in the id to get list of all the users    
*/
router.get('/:userid', function (req, res) {    
    dbutils.getUser(req);
});

//export this router to use in our index.js
module.exports = router;