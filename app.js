var express = require('express');
var app = express();
var routes = require('./routes');
var config = require('./config');
const db = require('./DAL/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/users', routes.userroutes);
app.use('/messages', routes.messageroutes);

db.init().then(() => {    
    app.listen(config.appsettings.port, () => {
        console.log('Node server started successfully at port : ' + config.appsettings.port);
    });
})
.catch((error)=>{
    console.log('Node server failed to start. ' + error.stack);
})