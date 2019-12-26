var express = require('express');
var app = express();
var routes = require('./routes');
var config = require('./config');
const db = require('./DAL/db');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});

app.use('/auth', routes.authroutes);
app.use(expressJwt({ secret: config.appsettings.jwttoken }).unless({ path: ['/auth'] }));
app.use('/users', routes.userroutes);
app.use('/messages', routes.messageroutes);

app.get('/', function (req, res) {
    res.send("This is a sample Messaging application.");
});



db.init().then(() => {    
    let port = process.env.PORT;
    if (port == null || port == "") {
        port = config.appsettings.port;
      }
    app.listen(port, () => {
        console.log('Node server started successfully at port : ' + port);
    });
})
.catch((error)=>{
    console.log('Node server failed to start. ' + error.stack);
})