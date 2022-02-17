const mysql = require('mysql2');

// Conexion con la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'carlos',
    password: 'Festafolc1!',
    database: 'proyecto'
});

pool.getConnection((err,connection)=> {
    if(err) throw err;
    console.log('Database connected successfully');
    connection.release();
  });

module.exports = pool;