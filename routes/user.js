const { Router } = require('express');
const { insertUser } = require('../controllers/users');
const { deleteUser } = require('../controllers/users/deleteUserController');

const router = Router();

router.post('/signup', insertUser);

router.put('/', deleteUser);

module.exports = router;