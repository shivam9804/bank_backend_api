const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
    }
    if (req.body.password != req.body.cPassword) {
      return res.render('signup', {
        message: "password do not match"
      });
    }
    // Create a Customernew
    const customer = new Customer({
      email: req.body.email,
      name: req.body.name,
      profession: req.body.profession,
      age: req.body.age,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      company: req.body.company,
      gender: req.body.gender
    });

    // Save Customer in the database
    Customer.create(customer, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Customer."
            });
        else res.render('login', {
          message: 'User registered successfully'
        });
    });
};

//change Password
exports.updatePassword = (req, res) => {
  if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
  }
  if (req.body.password != req.body.cPassword) {
    res.render('user_dashboard', {
      message: "password do not match"
    });
  }
  customer_id = req.session.userId;
  Customer.updatePassword(customer_id, req.body.password, (err, data) => {
    if (err) {
      res.status(404).send({
        messgae: "Some error occured"
      })
    }
    else {
      req.flash('message', 'Password updated successfully');
      req.session.userId = customer_id;
      res.redirect('/change_password');
    }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  console.log(req.params.customerId)
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
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

    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Customer with id ${req.params.customerId}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Customer with id " + req.params.customerId
            });
            }
        } else{
          // res.send(data);
          res.render('user_dashboard', {
            data
          });
        } 
      }
    );
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};