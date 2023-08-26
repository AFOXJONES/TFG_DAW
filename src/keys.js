
const {PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,DB_PORT
} = require('./config');


module.exports={

    database:{
        host:'localhost',
        user:'root',
        password:'',
        database:'usuarios'
    }
 //   220Oravla.022
};
/*
module.exports={

    database:{
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        port:DB_PORT,
        database:DB_NAME
    }
    
};
*/