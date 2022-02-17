const {Router} = require('express');
const {check} = require('express-validator');
const { loginUser } = require('../controllers/auth/loginController');
const { validateJWTController } = require('../controllers/auth/validateJWTController');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.post('/login', 
    [
        check('email', 'email is required').notEmpty(),
        check('email', 'Please, write a valid email').isEmail(),
        check('password', 'Password is required').notEmpty(),
        fieldValidators
    ],
    loginUser);

module.exports = router;


router.get('/renew', validateJWT, validateJWTController);