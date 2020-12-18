const GetInTouch = require('../models/getintouch.model');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
       res.status(400).send({
           message: "Content can not be empty!"
       });
   }
   
   // Create a Customer
   const getInTouch = new GetInTouch({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message
   });

   // Save Customer in the database
   GetInTouch.create(getInTouch, (err, data) => {
       if (err)
           res.status(500).send({
           message:
               err.message || "Some error occurred while creating the details."
           });
       else res.render('', {
         message: "Details submitted"
       });
   });
};


// Retrieve all Service from the database.
exports.findAll = (req, res) => {
   GetInTouch.getAll((err, data) => {
       if (err)
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving details."
         });
       else res.send(data);
     });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
   GetInTouch.findById(req.params.touchId, (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found details with id ${req.params.touchId}.`
           });
         } else {
           res.status(500).send({
             message: "Error retrieving details with id " + req.params.touchId
           });
         }
       } else res.send(data);
     });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
   GetInTouch.remove(req.params.touchId, (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found details with id ${req.params.touchId}.`
           });
         } else {
           res.status(500).send({
             message: "Could not delete details with id " + req.params.touchId
           });
         }
       } else res.send({ message: `Details was deleted successfully!` });
     });
};

exports.deleteAll = (req, res) => {
   GetInTouch.removeAll((err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while removing all details."
       });
     else res.send({ message: `All details were deleted successfully!` });
   });
};