const { deactivateHomeById } = require('../../DAO/homeDAO');

//Desactivar el home por su id
const deactivateHome = async (req, res) => {
    //Obtenemos el id del params de la url
    const id = req.params.id
    try {
        //Se actualiza el estado a desactivado del home con la función del DAO
        const data = await deactivateHomeById(id);
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
            msg: 'Home has been deactivated',
            home: data[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deactivateHome
}