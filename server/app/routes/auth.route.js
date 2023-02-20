const express = require("express");
const router = express.Router();
const upload  = require("../middleware/multer");

const log = require('../controllers/auth.controller');

router.post('/register',log.register);
router.post('/login',log.login);

//router.post('/add_rooms/:property_id', upload.single("image"), landlord.addRoomImages);

module.exports = router;