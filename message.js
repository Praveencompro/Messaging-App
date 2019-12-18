var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('get message req recieved');
});
router.post('/', function (req, res) {
    res.send('add mesage req recieved');
});

//export this router to use in our index.js
module.exports = router;