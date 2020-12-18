const Service = require('../models/service.model');

exports.create = (req, res) => {
     // Validate request
     if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const service = new Service({
        serviceName: req.body.serviceName,
        serviceDescription: req.body.serviceDescription,
    });

    // Save Customer in the database
    Service.create(service, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Service."
            });
        else res.send(data);
    });
};


// Retrieve all Service from the database.
exports.findAll = (req, res) => {
    Service.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving service."
          });
        else res.send(data);
      });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Service.findById(req.params.serviceId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found service with id ${req.params.serviceId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving service with id " + req.params.serviceId
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Service.updateById(
        req.params.serviceId,
        new Service(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found service with id ${req.params.serviceId}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating service with id " + req.params.serviceId
            });
            }
        } else res.send(data);
        }
    );
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Service.remove(req.params.serviceId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Service with id ${req.params.serviceId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Service with id " + req.params.serviceId
            });
          }
        } else res.send({ message: `Service was deleted successfully!` });
      });
};

exports.deleteAll = (req, res) => {
    Service.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all service."
        });
      else res.send({ message: `All service were deleted successfully!` });
    });
};