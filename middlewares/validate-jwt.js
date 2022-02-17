const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    //Buscamos el token en el Header
    const token = req.header('x-token');
    //Comprobamos si existe token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no jwt'
        });
    }

    try {
        //Verificamos la validez del token
        const {id} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        //Añadimos a la request los valores del token
        req.id = id;
    } catch (error) {
        //Obtenemos el error en caso de que se produzca
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        });
    }

    next();

}

module.exports = {
    validateJWT
}   