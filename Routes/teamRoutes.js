const express = require('express');
const router = express.Router();
const { addTeam } = require('../controllers/teamcontroller');


router.post('/organizations/:id/teams', addTeam);


module.exports = { teamRouter: router };
