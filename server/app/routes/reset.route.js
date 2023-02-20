const express = require("express");
const router = express.Router();

const reset = require('../controllers/resetPassword.controller')

router.get('/send',reset.mailsend);
router.put('/reset',reset.changePassword);
router.put('/newuser/:employee_number',reset.newUserchangePassword);

module.exports = router;