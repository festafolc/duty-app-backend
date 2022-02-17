const bcryptjs = require('bcryptjs');
const pool = require('../database/config');


//Crear usuario
const insertUser = async (req, res) => {
    //Obtenemos los atributos del objeto a través del body
    const {name, surname, surname2, birth, email, phone, username, password} = req.body;
    //Se crea la función
    const insertUser_ = async () => {
        //Se abre conexión con la base de datos
        pool.getConnection((err, connection) => {
            //Si hay un error en la conexión se lanza el error
            if (err) throw err;
            //Se encripta la contraseña
            const salt = bcryptjs.genSaltSync(10);
            const hashPassword = bcryptjs.hashSync(password, salt);
            //Se establece y se ejecuta la query
            connection.query("INSERT INTO USERS (name, surname, surname2, birth, email, phone, username, password) VALUES (?, ?, ? , ?, ?, ?, ?, ?);",
                            [name, surname, surname2, birth, email, phone, username, hashPassword],
                            (err, rows) => {
                //Devolvemos la conexión a la pool
                connection.release();
                //Si hay un error con la ejecución de la query se lanza el error
                if (err) throw err;
                //Se deuvuelve el objeto guardado
                return res.status(201).json({
                    ok: true,
                    msg: 'New user registered',
                    rows,
                    user: {name, surname, surname2, birth, email, phone, username, password}
                });
            });
        });
    }
    try {
        //Se ejecuta la función que inserta un usuario nuevo
        await insertUser_();
    } catch (error) {
        console.log(error);
    }
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