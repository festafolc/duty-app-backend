const { getAllLivingHomesByUserId } = require("./homeDAO");

//Obtener todos los homes vivos por id del usuario
const getAllLivingHomesByUser = async (req, res) => {
    //Obtenemos el id del usuario a través del token en la request
    const {id} = req;
    //Se verifica la existencia del usuario
    if (id === null) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        });
    }
    try {
        //Se obtiene la data con la función del DAO
        const data = await getAllLivingHomesByUserId(id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No data has been found',
            });
        }
        //Se devuelve los homes obtenidos
        return res.status(201).json({
            ok: true,
            homes: data[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLivingHomesByUser
}