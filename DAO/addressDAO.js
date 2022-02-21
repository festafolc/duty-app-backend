const pool = require('../database/config');

//Insertar un nuevo address
const insertAddressByUserId = async (country, state, city, street, homeNumber, floor, door, zipcode, userId) => {
    //Se establece la query
    const query = "INSERT INTO ADDRESS (country, state, city, street, home_numer, floor, door, zipcode, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const data = await pool.promise().query(query, [country, state, city, street, homeNumber, floor, door, zipcode, userId], (err) => {
        //Si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto address insertado
    return data;
}

module.exports = {
    insertAddressByUserId
}