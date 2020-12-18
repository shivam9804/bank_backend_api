const Employee = require('../models/employee.model');

//creating and saving new employee
exports.create = (req, res) => {
  //validate request
  if (!req.body){
    res.render('employee_dashboard', {
      message: 'Password do not match'
    })
  }

  //create employee
  const employee = new Employee({
    email: req.body.email,
    name: req.body.name,
    designation: req.body.designation,
    age: req.body.age,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender
  });
  
  //saving employee in database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
          message: err.message || "Some error occurred while creating the employee."
      });
    else res.render('employee_login');
  });
};

//retrieve one single employee
exports.findOne = (req, res) => {
  Employee.findById(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employeeId
        });
      }
    } else res.send(data);
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
    res.render('employee_dashboard', {
      message: "password do not match"
    });
  }
  employee_id = req.session.empId;
  Employee.updatePassword(employee_id, req.body.password, (err, data) => {
    if (err) {
      res.status(404).send({
        messgae: "Some error occured"
      })
    }
    else {
      req.flash('message', 'Password updated successfully');
      req.session.empId = employee_id;
      res.redirect('/employee_change_password');
    }
  });
};


//retrieve all employee
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee."
      });
    else res.send(data);
  });
};

//update employee by employeeId
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
  }
  Employee.updateById(
    req.params.employeeId,
    new Employee(req.body),
    (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found Employee with id ${req.params.employeeId}.`
        });
        } else {
        res.status(500).send({
            message: "Error updating Employee with id " + req.params.employeeId
        });
        }
    } else res.send(data);
    }
  );
};


//delete one single employee
exports.delete = (req, res) => {
  Employee.remove(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.employeeId
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

//delete all employee
exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employee."
      });
    else res.send({ message: `All Employee were deleted successfully!` });
  });
};
