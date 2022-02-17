const { deleteHomeById } = require('./homeDAO');

//Eliminar el home por su id
const deleteHome = async (req, res) => {
    //Obtenemos el id del params de la url
    const id = req.params.id
    try {
        //Se elimina el home con la función del DAO
        const data = await deleteHomeById(id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No data has been deleted',
            });
        }
        //Se devuelve la data
        return res.status(200).json({
            ok: true,
            msg: 'Home has been deleted',
            home: data[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deleteHome
}