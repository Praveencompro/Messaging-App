var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

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
    //creating mongodb connection and add user    
});

/*
    Request for getting a user from DB
    /all will be passed in the id to get list of all the users    
*/
router.get('/:userid', function (req, res) {
    let userid = req.params.userid;
    res.send('get user req recieved for userid : ' + userid);
});

//export this router to use in our index.js
module.exports = router;