const express = require("express");
const router = express.Router();

const company = require('../controllers/company.controller');

router.post('/registration',company.companyRegister);
router.get('/getCompany',company.getAllC);
router.get('/getNotifications',company.getNotifications);
router.get('/getNotified',company.getNotified);
router.get('/getCompanyById/:company_id', company.getCompanyById);
router.get('/approvePicture/:employee_number', company.ApprovePictureRequest);
router.patch('/addCompanyID/:employee_number', company.addCompanyID);
router.patch('/deleteNotifs/:id', company.softDeleteNotifications);

module.exports = router;  