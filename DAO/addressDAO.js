const pool = require('../database/config');

//Insertar un nuevo address
const insertAddressByUserId = async (country, state, city, street, streetNumber, floor, door, zipcode, longitude, latitude, userId,) => {
    //Se establece la query
    const query = "INSERT INTO ADDRESS (country, state, city, street, street_number, floor, door, zipcode, longitude, latitude, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [country, state, city, street, streetNumber, floor, door, zipcode, longitude, latitude, userId], (err) => {
        //Si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto address insertado
    return data;
}

module.exports = {
    insertAddressByUserId
}