const express = require('express');
const service = require('../controllers/service.controller');
let router = express.Router();
    
  // Create a new service or fetch all cutomer
  router
    .route("/")
    .post(service.create)
    .get(service.findAll)
    .delete(service.deleteAll);


  // fetch single service or update a customer
  router
    .route("/:serviceId")
    .get(service.findOne)
    .put(service.update)
    .delete(service.delete);

module.exports = router;