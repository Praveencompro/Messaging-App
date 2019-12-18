var config = {
    appsettings: {
        port: 3000
    },

    database: {
        mongodb: {
            url:'mongodb+srv://pk_app_user:appuser1234@cluster0-dcxfg.mongodb.net/test?retryWrites=true&w=majority',
            dbname:'MessagingApp',
            dbschema:{
                usercollname:'users'
            }
        }        
    }
};

module.exports = config;