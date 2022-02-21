const { getAllDeletedHomesByUserId } = require('../../DAO/addressDAO');

const getAllDeletedHomes = async (req, res) => {
    //Obtenemos el id del usuario a través del token
    const {id} = req;
    //Se verifica la existencia del usuario
    if (id === null) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        });
    }
    try {
        //Se obtiene todos los homes eliminados
        const data = await getAllDeletedHomesByUserId(id);
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
    getAllDeletedHomes
}