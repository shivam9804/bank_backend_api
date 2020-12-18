const express = require('express');
const customers = require('../controllers/customer.controller');
let router = express.Router();
    
  // Create a new Customer or fetch all cutomer
  router.post('/', customers.create);
  router.post('/changepassword', customers.updatePassword);
  router.get('/', customers.findAll);
  router.delete('/', customers.deleteAll);

  // fetch single cutomer or update a customer
  router.get("/:customerId", customers.findOne);
  router.put("/:customerId", customers.update);
  router.delete("/:customerId", customers.delete);

module.exports = router;