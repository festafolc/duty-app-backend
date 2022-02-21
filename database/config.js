const mysql = require('mysql2');

// Conexion con la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection((err,connection)=> {
    if(err) throw err;
    console.log('Database connected successfully');
    connection.release();
  });

module.exports = pool;