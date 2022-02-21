const { insertUser } = require('../../DAO/usersDAO');

//Insertar un home
const insertUserController = async (req, res) => {
    //Obtenemos los datos a través del body
    const {name, surname, surname2, birth, email, phone, username, password} = req.body;
    try {
        //Se inserta un nuevo usuario
        const data = await insertUser(name, surname, surname2, birth, email, phone, username, password);
        //Si la función no devuelve nada entones finaliza con false
        if (data[0].affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'User has not been inserted',
                user: data
            });
        }
        //Obtenemos el id insertado
        const id = data[0].insertId;
        //Se devuelve el user que fue insertado
        return res.status(201).json({
            ok: true,
            msg: 'New user inserted',
            user: {id, name, surname, surname2, birth, email, phone, username}
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertUserController
}