const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../../helpers/jwt");
const { getUserByEmail } = require("../../DAO/usersDAO");

const loginUser = async (req, res) => {
    //Obtenemos el email y el password a través del body
    const {email, password} = req.body;
    //Si no hay email finaliza la función
    if (email === '' || email === null) {
        return res.status(404).json({
            ok: false,
            msg: 'Email not found'
        });
    }
    try {
        //Se localiza el email en la base de datos
        const [data] = await getUserByEmail(email);
        //Si la función no devuelve nada entones finaliza con false
        if (data.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Email does not exist',
                email
            });
        }
        //Se compara el password enviado con el password del usuario
        const passwordBD = data[0].password;
        const validPassword = bcryptjs.compareSync(password, passwordBD);
        //Si el password no es correcto se notifica
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorreta'
            });
        }
        //Se generan el token del usuario
        const token = await generateJWT(data[0].id);
        //Se devuelve el usuario que fue logueado
        return res.status(201).json({
            ok: true,
            msg: 'Login success',
            user: data,
            token
        });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    loginUser
}