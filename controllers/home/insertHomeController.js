const { insertHomeByUserId } = require("./homeDAO");

//Insertar un home
const insertHome = async (req, res) => {
    //Obtenemos los datos a través del body
    const {name, type, country, state, city, street, homeNumber, floor, door, zipcode, userId} = req.body;
    //Se verifica la existencia del usuario
    if (userId === null) {
        return res.status(404).json({
            ok: false,
            msg: 'Id for FK not found'
        });
    }
    try {
        //Se inserta un nuevo home según el id del usuario
        const data = await insertHomeByUserId(name, type, country, state, city, street, homeNumber, floor, door, zipcode, userId);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Home has not been inserted',
                home: data
            });
        }
        //Obtenemos el id insertado
        const id = data[0].insertId;
        //Se devuelve el home que fue insertado
        return res.status(201).json({
            ok: true,
            msg: 'New home inserted',
            home: {id, name, type, country, state, city, street, homeNumber, floor, door, zipcode, userId}
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertHome
}