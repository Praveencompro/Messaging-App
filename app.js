var express = require('express');
var app = express();
var users = require('./user.js');
var messages = require('./message.js');

app.use('/users', users);
app.use('/messages', messages);

app.listen(3000);