const express = require('express');
const getInTouch = require('../controllers/getintouch.controller');
let router = express.Router();
    
  // Create a new service or fetch all cutomer
  router.post('/', getInTouch.create);
  router.get('/', getInTouch.findAll);
  router.delete('/', getInTouch.deleteAll);


  // fetch single service or update a customer
  router.get("/:touchId", getInTouch.findOne);
  router.delete("/:touchId", getInTouch.delete);

module.exports = router;