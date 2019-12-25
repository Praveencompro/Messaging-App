var config = require('./../config')

class Message {
    constructor(db) {
        this.collection = db.collection(config.database.mongodb.dbschema.messagecollname);
    }

    getMessages(req, res) {
        let sender = req.params.sender;
        let reciever = req.params.reciever;
        console.log('Request recieved for getting messages. sender : ' + sender + ', reciever : ' + reciever);

        var query = { $or: [{ sender, reciever }, { reciever: sender, sender: reciever }] };
        var qprojection = {};
        this.collection.find(query, { projection: qprojection }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }

    sendMessage(req, res) {
        let msgObj = req.body;
        console.log('Request recieved for sending message. MessageObj : ' + JSON.stringify(msgObj));
        msgObj['timestamp'] = Date.now();
        this.collection.insertOne(msgObj);
        let responseObj = { message: 'Message sent successfully.' }
        res.send(responseObj);
    }
}

module.exports = Message;