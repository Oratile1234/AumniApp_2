const express = require("express");
const router = express.Router();
const upload= require('../middleware/multer')
const users = require('../controllers/users.controller');

router.get('/getUsers',users.getAll);
router.get('/getStats/:looking',users.getlooking);
router.patch('/updateLookingStatus/:employee_number', users.updateLookingStatus);

router.patch('/updateStatus/:employee_number', users.updateStatus);
router.get('/getAlumni/:employement_status',users.getByStatus);
router.get('/getById/:employee_number', users.getById);
router.get('/search/:name',users.search);
router.patch('/upload/:id',upload.single("image"),users.updatePicture)
router.post('/uploadNew/:user_id',upload.single("image"),users.InsertPicture)
router.patch('/acceptUserNotifs/:user_id', users.acceptUserNotifs);
router.get('/UserNotifs/:user_id', users.getUserNotifs);
router.patch('/declineNotifs/:user_id', users.declineUserNotifs);



module.exports = router; 