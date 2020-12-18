const express = require('express');
const applyNow = require('../controllers/applyNow.controller');
let router = express.Router();

  // fetch single cutomer or update a customer
  router.post('/', applyNow.create);

module.exports = router;