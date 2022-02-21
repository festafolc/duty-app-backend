const { insertAddressByUserId } = require("../../DAO/addressDAO");


//insertar un address
const insertAddress = async (req, res) => {
    //Obtenemos los datos a través del body
    const {country, state, city, street, home_numer, floor, door, zipcode, user_id} = req.body;
    //Se verifica la existencia de la FK
    if (user_id === null) {
        return res.status(404).json({
            ok: false,
            msg: 'Id for FK not found'
        });
    }
    try {
        //Se inserta un nuevo address según el id del usuario
        const data = await insertAddressByUserId(country, state, city, street, home_numer, floor, door, zipcode, user_id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Address has not been inserted',
                duty: data
            });
        }
        //Se devuelve el address que fue insertado
        return res.status(201).json({
            ok: true,
            msg: 'New address inserted',
            duty: {country, state, city, street, home_numer, floor, door, zipcode, user_id}
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertAddress
}