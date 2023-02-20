const express = require("express");
const router = express.Router();

const portfolio = require('../controllers/portfolio.controller');

router.get('/getSkills', portfolio.getAll); // get all skills available
router.get('/getExpertise', portfolio.getExpertise); // get all from Expertise table
router.get('/getPortfolio/:user_id', portfolio.getPortfolio); // get all data from portfolio table

router.post('/skills', portfolio.skills); //insert into skills table
router.post('/expertise', portfolio.expertise); //insert into Expertise table
router.post('/portfolio/:user_id', portfolio.portfolio); //insert into portfolio table
router.post('/addSkills/:user_id', portfolio.addSkills); //insert into skills table
router.post('/addExpertise/:user_id', portfolio.addExpertise);
router.post('/addProject/:user_id', portfolio.addProjects);

router.get('/mySkills/:user_id', portfolio.getMySkills);
router.get('/myExpertise/:user_id', portfolio.getMyExpertise);
router.get('/projects/:employee_number',portfolio.getprojects);

router.patch('/update/:user_id',portfolio.update);
router.patch('/updateSummary/:user_id',portfolio.updateSummary);
// router.patch('/updateProject/:user_id',portfolio.updateProject);
// router.get('/tryMe/:user_id',portfolio.tryMe);
router.patch('/updateRatings/:user_id',portfolio.updateRatings);

router.delete('/deleteProject/:id',portfolio.deleteProject);

module.exports = router;