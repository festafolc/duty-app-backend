const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    // Crear promesa para trabajar mejor ya que jwt no trabaja con promesas
    return new Promise((resolve, reject) => {
        const payload = {id};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Token was not created')
            }
            resolve(token);
        });
    });
}


module.exports = {
    generateJWT
}