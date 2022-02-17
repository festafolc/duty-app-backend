const { Router } = require("express");
const { check } = require("express-validator");
const { insertDuty } = require("../controllers/duties/insertDutyController");
const { fieldValidators } = require("../middlewares/fieldValidators");

const router = Router();

router.post('/newDuty', 
    [
        check('name', 'name is required').notEmpty(),
        check('start', 'start is required').notEmpty(),
        check('end', 'end is required').notEmpty(),
        fieldValidators
    ],
    insertDuty)

module.exports = router;