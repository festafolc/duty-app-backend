const { deleteUserById } = require("../users");

const deleteUser = async (req, res) => {
    //Obtenemos el id a través del body
    const {id} = req.body;
    //Si no hay id finaliza la función
    if (id === null) {
        return res.status(404).json({
            ok: false,
            msg: 'Id not found'
        });
    }
    try {
        //Se borra el usuario a través del id
        const data = await deleteUserById(id);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'User has not been deleted',
                user: data
            });
        }
        //Se devuelve el usuario que fue borrado
        return res.status(201).json({
            ok: true,
            msg: 'Usuario borrado',
            user: data
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deleteUser
}