const geocoder = require('../../helpers/geocoder');
const { insertHomeByUserId } = require('../../DAO/homeDAO');
const { insertAddressByUserId} = require('../../DAO/addressDAO');

//Insertar un home
const insertHome = async (req, res) => {
    //Obtenemos los datos a través del body
    const {name, type, country, state, city, street, streetNumber, floor, door, zipcode, userId} = req.body;
    //Se verifica la existencia del usuario
    if (userId === null) {
        return res.status(404).json({
            ok: false,
            msg: 'Id for FK not found'
        });
    }
    try {
        //Se obtiene la longitud y latitud con geocode
        const location = await geocoder.geocode(streetNumber + ' ' + street + ' ' + city + ' ' + state + ' ' + zipcode + ' ' + country);
        const longitude = location[0].longitude
        const latitude = location[0].latitude
        //Se inserta una nueva dirección
        const address = await insertAddressByUserId(country, state, city, street, streetNumber, floor, door, zipcode, longitude, latitude, userId);
        //Se obtiene el id de la dirección insertada para usarla como FK
        const addressId = address[0].insertId;
        //Se inserta un nuevo home según el id del usuario
        const data = await insertHomeByUserId(name, type, addressId);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Home has not been inserted',
                home: data,
            });
        }
        //Obtenemos el id insertado
        const id = data[0].insertId;
        //Se devuelve el home que fue insertado
        return res.status(201).json({
            ok: true,
            msg: 'New home inserted',
            home: {id, name, type, country, state, city, street, streetNumber, floor, door, zipcode, longitude, latitude, userId}
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertHome
}