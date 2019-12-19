class Message {
    constructor(db) {
        this.collection = db.collection('messages');
    }

    sendMessage(msgObj) {
        return new Promise((resolve, reject) => {
            msgObj['timestamp'] = Date.now();
            this.collection.insertOne(msgObj);
            resolve('message sent successfully.');
        })
    }

    getMessages(sender, reciever) {
        return new Promise((resolve, reject) => {
            var query = { sender, reciever };
            var qprojection = { };
            this.collection.find(query, { projection: qprojection }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                resolve(result);
            });
        })
    }
}

module.exports = Message;