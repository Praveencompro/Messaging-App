class User {
    constructor(db) {
        this.collection = db.collection('users');
    }

    getUserByEmailId(emailid) {
        return new Promise((resolve, reject) => {
            var query = { emailid };
            var qprojection = { 'password': 0 };
            this.collection.find(query, { projection: qprojection }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                resolve(result);
            });
        })
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            var query = {};
            var qprojection = { 'password': 0 };
            this.collection.find(query, { projection: qprojection }).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                resolve(result);
            });
        })
    }

    addUser(user) {
        return new Promise((resolve, reject) => {
            let emailID = user.emailid;
            this.getUserByEmailId(emailID).then((result) => {
                if (result && result.length > 0) {
                    let msg = 'EmailId already registered with another user.';
                    console.warn(msg + ' EmailID : ' + emailID);
                    resolve(msg);
                }
                else {
                    this.collection.insertOne(user);
                    let msg = 'User added successfully.';
                    console.log(msg + ' EmailID : ' + emailID);
                    resolve(msg);
                }
            })
        })
    }
}

module.exports = User;