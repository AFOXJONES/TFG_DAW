const mysql= require('mysql');
const {promisify}=require('util')
const { database }=require('./keys');


const pool=mysql.createPool(database);//se va ejecutando en secuencia

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION CON LA BBDD HA SIDO CERRADA');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.error('LA BBDD TIENE DEMASIADAS CONEXIONES')
        }
        if(err.code==='ECONNREFUSED'){
            console.error('LA CONEXION HA SIDO RECHAZADA')
        }
    }
    if(connection) connection.release();
    console.log('BBDD esta conectada')
    return;
});

//promisify pool querys
pool.query = promisify(pool.query);// cada vez que se haga una consulta se van a utilizar promesas

module.exports=pool;