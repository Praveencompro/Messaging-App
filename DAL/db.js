exports.addUser = function (req) {
    return new Promise((resolve, reject) => {        
        if (db) {
            var dbo = dbconn.db(config.database.mongodb.dbname);
            dbo.collection(config.database.mongodb.dbschema.usercollname).insertOne(userdata, function (err, res) {
                if (err) throw err;
                resolve("user created successfully.");
            });
        }
        else {
            reject("DB Connection does not exists.");
        }
    })    
}

getUserByEmailId = (emailid) => {
    return new Promise((resolve, reject) => {
        //const dbconn = req.app.locals.dbconn;
        if (db) {
            var dbo = dbconn.db(config.database.mongodb.dbname);
            var query = { emailid };
            dbo.collection(config.database.mongodb.dbschema.usercollname).find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        }
        else {
            reject("DB Connection does not exists.");
        }
    })
}

exports.getUser = function (req) {
    return new Promise((resolve, reject) => {
        let emailid = req.params.userid;
        //const dbconn = req.app.locals.dbconn;
        if (db) {
            var dbo = dbconn.db(config.database.mongodb.dbname);
            var query = { emailid };
            dbo.collection(config.database.mongodb.dbschema.usercollname).find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        }
        else {
            reject("DB Connection does not exists.");
        }
    })
}