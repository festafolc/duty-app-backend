const pool = require('../../database/config');

//Insertar un nuevo duty
const insertDutyByUserId = async (name, start, end, created_by) => {
    //Se establece la query
    const query = "INSERT INTO DUTIES (name, start, end, created_by) VALUES (?, ?, ?, ?);";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [name, start, end, created_by], (err) => {
        //si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto duty insertado
    return data;    
}

module.exports = {
    insertDutyByUserId
}