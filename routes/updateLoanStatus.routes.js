const express = require('express');
const updateLoanStatus = require('../controllers/updateloanstatus.controller');
let router = express.Router();

router.post('/', updateLoanStatus.updateLoanStatus);

module.exports = router;

