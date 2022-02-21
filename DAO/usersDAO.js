const bcryptjs = require('bcryptjs');
const pool = require('../database/config');


//Crear usuario
const insertUser = async (name, surname, surname2, birth, email, phone, username, password) => {
    //Se establece la query para insertar un nuevo usuario
    const query = "INSERT INTO USERS (name, surname, surname2, birth, email, phone, username, password) VALUES (?, ?, ? , ?, ?, ?, ?, ?);";
    //Se encripta la contraseña
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);    
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [name, surname, surname2, birth, email, phone, username, hashPassword], (err) => {
        //Si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto usuario insertado
    return data;
}

//Encontrar usuario por email
const getUserByEmail = async (email) => {
    //Se establece y se ejecuta la query
    const query = "SELECT id, email, username, password FROM USERS WHERE USERS.email = ? AND USERS.deleted = 'NO';";
    const data = await pool.promise().query(query, [email], (err) => {
        //Si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve la data obtenida
    return data;
}

//Eliminar usuario
const deleteUserById = async (id) => {
    //Se establece la query
    const query = "UPDATE USERS SET deleted = 'YES' WHERE id = ?;"
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        //Si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el usuario eliminado
    return data
}

module.exports = {
    insertUser,
    getUserByEmail,
    deleteUserById
}