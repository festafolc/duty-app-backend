const {validationResult} = require('express-validator');

const fieldValidators = (req, res, next) => {
    //Control de errores en pedidos http
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = {fieldValidators}