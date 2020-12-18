const EmployeeLogin = require('../models/employeeLogin.model');
const Customer = require('../models/customer.model')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.findOne = (req, res) => {
  if (!req.body){
    res.status(400).send({
        message: "Content cannot be empty!" 
    });
  }
  
  const loginCredentials = new EmployeeLogin({
    email : req.body.email,
    password : req.body.password
  });

  //authecating user
  EmployeeLogin.login(loginCredentials, async (err, empData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    }
    if (await bcrypt.compareSync(loginCredentials.password, empData.employee_password))  {
      var token = jwt.sign({empData}, process.env.JWT_SECRETKEY, {expiresIn: process.env.JWT_EXPIRES});
      req.session.empId = empData.employee_id;
      req.session.empData = empData;

      EmployeeLogin.getLoans((err, loanData) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred"
          });
        } 
        req.session.allUserLoanData = loanData;
      });

      Customer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else req.session.allUserData = data
      });

      // console.log({msg: 'Logged in!',token});
      res.render('employee_dashboard',{
        empId : req.session.empId,
        empData: req.session.empData,
        token
      });
      return;
    } else{
      res.render('employee_login',{
        "code":204,
        "message":"Email or password is incorrect"
      });
      return;
    }
  });
};