const { activateHomeById } = require('../../DAO/addressDAO')

//Activar el home por su id
const activateHome = async (req, res) => {
    //Obtenemos el id del params de la url
    const id = req.params.id
    try {
        //Se actualiza el estado a activado del home con la función del DAO
        const data = await activateHomeById(id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No data has been updated',
            });
        }
        //Se devuelve la data
        return res.status(200).json({
            ok: true,
            msg: 'Home has been activated',
            home: data[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    activateHome
}