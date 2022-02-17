const { insertDutyByUserId } = require('./duties')

//Crear duty
const insertDuty = async (req, res) => {
    //Obtenemos los datos a través del body
    const {name, start, end, created_by} = req.body;
    //Se verifica la existencia de la FK
    if (created_by === null) {
        return res.status(404).json({
            ok: false,
            msg: 'Id for FK not found'
        });
    }
    try {
        //Se inserta un nuevo duty según el id del usuario
        const data = await insertDutyByUserId(name, start, end, created_by);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Duty has not been inserted',
                duty: data
            });
        }
        //Se devuelve el duty que fue insertado
        return res.status(201).json({
            ok: true,
            msg: 'New duty inserted',
            duty: {name, start, end, created_by}
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertDuty
}