const { Router } = require('express');
const { insertUserController } = require('../controllers/users/insertUserController');
const { deleteUser } = require('../controllers/users/deleteUserController');

const router = Router();

router.post('/signup', insertUserController);

router.put('/', deleteUser);

module.exports = router;