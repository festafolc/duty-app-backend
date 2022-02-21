const { Router } = require('express');
const { insertUser } = require('../DAO/usersDAO');
const { deleteUser } = require('../controllers/users/deleteUserController');

const router = Router();

router.post('/signup', insertUser);

router.put('/', deleteUser);

module.exports = router;