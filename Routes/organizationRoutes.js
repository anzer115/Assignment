const express = require('express');
const router = express.Router();
const { getOrganizations, addOrganization } = require('../controllers/organizationcontroller') ;

router.get('/', getOrganizations);
router.post('/organizations', addOrganization);




module.exports = { organizationRouter: router };
