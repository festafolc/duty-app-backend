const { getHomeById } = require('../../DAO/addressDAO');

//Obtener home por id
const getHome = async (req, res) => {
    //Obtenemos el id del params de la url
    const id = req.params.id;
    try {
        //Se obtiene el home con la función del DAO
        const data = await getHomeById(id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No data has been found',
            });
        }
        //Se devuelve la data
        return res.status(200).json({
            ok: true,
            home: data[0]
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHome
}