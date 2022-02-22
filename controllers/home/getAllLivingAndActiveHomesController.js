const { getAllLivingAndActiveHomes } = require('../../DAO/homeDAO');

//Obtener todos los homes vivos y activos
const allLivingAndActiveHomes = async (req, res) => {
    try {
        //Se obtiene la data con la función del DAO
        const data = await getAllLivingAndActiveHomes();
        //Si la función no devuelve nada entonces finaliza con false
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
    allLivingAndActiveHomes
}