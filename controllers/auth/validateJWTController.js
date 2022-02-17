const { generateJWT } = require("../../helpers/jwt");

const validateJWTController = async (req, res) => {
    //Obtenemos el email para validar el token
    const email = req.email
    //Generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(email);
    return res.status(201).json({
        ok: true,
        msg: 'Validate Token',
        token
    });
}

module.exports = {
    validateJWTController
}