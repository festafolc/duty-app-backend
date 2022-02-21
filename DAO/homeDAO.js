const pool = require('../../database/config');

//Insertar un nuevo home
const insertHomeByUserId = async (name, type, country, state, city, street, homeNumber, floor, door, zipcode, userId) => {
    //Se establece la query para insertar un nuevo home
    const queryAddress = "INSERT INTO ADDRESS (country, state, city, street, home_number, floor, door, zipcode, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const dataAddress = await pool.promise().query(queryAddress, [country, state, city, street, homeNumber, floor, door, zipcode, userId], (err) => {
        //Si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Obtenemos el id del objeto address para usarla como FK en el objeto home
    const {insertId: addressId} = dataAddress[0];
    //Se establece la query para insertar un nuevo home
    const queryHome = "INSERT INTO HOME (name, type, address_id) VALUES (?, ?, ?);";
    //Se ejecuta la query en la base de datos
    const dataHome = await pool.promise().query(queryHome, [name, type, addressId], (err) => {
        //si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto homr insertado
    return dataHome;  
}

//Obtener todos los homes por id del usuario
const getAllHomesByUserId = async (id) => {
    //Se establece la query para obtener todos los homes por id del usuario
    const query = "SELECT h.id, h.name, h.deactivated, a.country, a.state, a.city, a.street, a.home_number, a.floor, a.door, a.zipcode, ht.name AS type_home FROM HOME h JOIN ADDRESS a ON h.address_Id = a.id JOIN HOME_TYPES ht ON h.type = ht.id WHERE a.user_id = ?;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data obtenida
    return data;
}

//Obtener todos los homes vivos por id del usuario
const getAllLivingHomesByUserId = async (id) => {
    //Se establece la query para obtener todos los homes vivos y activos
    const query = "SELECT h.id, h.name, h.deactivated, a.country, a.state, a.city, a.street, a.home_number, a.floor, a.door, a.zipcode, ht.name AS type_home FROM HOME h JOIN ADDRESS a ON h.address_Id = a.id JOIN HOME_TYPES ht ON h.type = ht.id WHERE a.user_id = ? AND h.deleted = 0;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data obtenida
    return data;
}

//Obtener todos los homes vivos y activos
const getAllLivingAndActiveHomes = async () => {
    //Se establece la query para obtener todos los homes vivos por id del usuario
    const query = "SELECT h.id, h.name, h.deactivated, a.country, a.state, a.city, a.street, a.home_number, a.floor, a.door, a.zipcode, ht.name AS type_home FROM HOME h JOIN ADDRESS a ON h.address_Id = a.id JOIN HOME_TYPES ht ON h.type = ht.id WHERE h.deactivated = 'NO' AND h.deleted = 0;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data obtenida
    return data;
}

//Obtener todos los homes eliminados por id del usuario
const getAllDeletedHomesByUserId = async (id) => {
    //Se establece la query para obtener todos los homes vivos por id del usuario
    const query = "SELECT h.id, h.name, h.deactivated, h.deleted, a.country, a.state, a.city, a.street, a.home_number, a.floor, a.door, a.zipcode, ht.name AS type_home FROM HOME h JOIN ADDRESS a ON h.address_Id = a.id JOIN HOME_TYPES ht ON h.type = ht.id WHERE a.user_id = ? AND h.deleted = 1;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data obtenida
    return data;
}

//Obtener un home por su id
const getHomeById = async (id) => {
    //Se establece la query para obtener todos los homes por id del usuario
    const query = "SELECT h.id, h.name, a.country, a.state, a.city, a.street, a.home_number, a.floor, a.door, a.zipcode, ht.name AS type_home FROM HOME h JOIN ADDRESS a ON h.address_Id = a.id JOIN HOME_TYPES ht ON h.type = ht.id WHERE h.id = ?;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data obtenida
    return data;
}

//Actualizar home por id
const updateHomeById = async (name, type, country, state, city, street, homeNumber, floor, door, zipcode, id) => {
    const query = "UPDATE HOME h JOIN ADDRESS a ON h.address_Id = a.id JOIN HOME_TYPES ht ON h.type = ht.id SET h.name = ?, h.type = ?, a.country = ?, a.state = ?, a.city = ?, a.street = ?, a.home_number = ?, a.floor = ?, a.door = ?, a.zipcode = ? WHERE h.id = ?;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [name, type, country, state, city, street, homeNumber, floor, door, zipcode, id], (err) => {
        //si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto actualizado
    return data;
}

//Activar home por id
const activateHomeById = async (deactivated) => {
    const query = "UPDATE HOME SET deactivated = 'NO' WHERE id = ?;";
    const data = await pool.promise().query(query, [deactivated], (err) => {
        //si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto actualizado
    return data;
}

//Desactivar home por id
const deactivateHomeById = async (deactivated) => {
    const query = "UPDATE HOME SET deactivated = 'YES' WHERE id = ?;";
    const data = await pool.promise().query(query, [deactivated], (err) => {
        //si hay un error con la ejecución de la query se lanza el error
        if (err) throw err;
    });
    //Se devuelve el objeto actualizado
    return data;
}

//Eliminar home por id
const deleteHomeById = async (id) => {
    //Se establece la query para eliminar el home por id
    const query = "UPDATE HOME SET deleted = '1' WHERE id = ?;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data
    return data;
}

//Recuperar home por id
const recoverHomeById = async (id) => {
    //Se establece la query para recuperar el home por id
    const query = "UPDATE HOME SET deleted = '0' WHERE id = ?;";
    //Se ejecuta la query en la base de datos
    const data = await pool.promise().query(query, [id], (err) => {
        if (err) throw err;
    });
    //Se devuelve la data
    return data;
}

module.exports = {
    insertHomeByUserId,
    getAllHomesByUserId,
    getAllLivingAndActiveHomes,
    getAllLivingHomesByUserId,
    getAllDeletedHomesByUserId,
    getHomeById,
    updateHomeById,
    activateHomeById,
    deactivateHomeById,
    deleteHomeById,
    recoverHomeById
}