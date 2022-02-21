const { recoverHomeById } = require('../../DAO/addressDAO');

//Recuperar el home por su id
const recoverHome = async (req, res) => {
    //Obtenemos el id del params de la url
    const id = req.params.id
    try {
        //Se recupera el home eliminado
        const data = await recoverHomeById(id);
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
            msg: 'Home has been recovered',
            home: data[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    recoverHome
}