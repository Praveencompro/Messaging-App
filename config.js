var config = {
    appsettings: {
        port: 3000,
        jwttoken: 'message-app-token'
    },

    database: {
        mongodb: {
            url:'mongodb://pk_app_user:appuser1234@cluster0-shard-00-00-dcxfg.mongodb.net:27017,cluster0-shard-00-01-dcxfg.mongodb.net:27017,cluster0-shard-00-02-dcxfg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
            dbname:'MessagingApp_dev',
            dbschema:{
                usercollname: 'users',
                messagecollname: 'messages'
            }
        }        
    }
};

module.exports = config;