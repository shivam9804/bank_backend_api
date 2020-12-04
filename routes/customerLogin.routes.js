const express = require('express');
const customerLogin = require('../controllers/customerLogin.controller');
let router = express.Router();

  // fetch single cutomer or update a customer
  router.post('/', customerLogin.findOne);

module.exports = router;