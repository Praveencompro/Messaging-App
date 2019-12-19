var express = require('express');
var app = express();
var routes = require('./routes');
var config = require('./config');
const db = require('./DAL/db');

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