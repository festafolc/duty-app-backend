const { updateHomeById } = require('../../DAO/addressDAO');

//Actualizar home por su id
const updateHome = async (req, res) => {
    //Obtenemos el id del params de la url
    const id = req.params.id;
    //Obtenemos los datos a través del body
    const {name, type, country, state, city, street, homeNumber, floor, door, zipcode} = req.body;
    try {
        //Se actualliza el home con la función del DAO
        const data = await updateHomeById(name, type, country, state, city, street, homeNumber, floor, door, zipcode, id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Home has not been update',
                home: data
            });
        }
        //Se devuelve el home que fue insertado
        return res.status(201).json({
            ok: true,
            msg: 'Home has been updated',
            home: {id, name, type, country, state, city, street, homeNumber, floor, door, zipcode}
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateHome
}