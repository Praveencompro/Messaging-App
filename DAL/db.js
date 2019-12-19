const { MongoClient } = require('mongodb');
const config = require('./../config');
const Users = require('./../user');
const Messages = require('./../message');

class MongoBot {

    constructor() {
        const url = config.database.mongodb.url;
        this.client = new MongoClient(url);
    }

    init() {
        return this.client.connect().then(() => {
            console.log('connected');
            this.db = this.client.db(config.database.mongodb.dbname);
            this.Users = new Users(this.db);
            this.Messages = new Messages(this.db);
        })
    }
}

module.exports = new MongoBot();