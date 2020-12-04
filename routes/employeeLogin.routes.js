const express = require('express');
const employeeLogin = require('../controllers/employeeLogin.controller');
let router = express.Router();

  // fetch single cutomer or update a customer
  router.post('/', employeeLogin.findOne);

module.exports = router;