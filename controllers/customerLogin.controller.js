const CustomerLogin = require('../models/customerLogin.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.findOne = (req, res) => {
  if (!req.body){
    res.status(400).send({
        message: "Content cannot be empty!" 
    });
  }

  const loginCredentials = new CustomerLogin({
    email : req.body.email,
    password : req.body.password
  });
  
  //authecating user
  CustomerLogin.login(loginCredentials, async (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    } 
    if (await bcrypt.compareSync(loginCredentials.password, data.password))  {
        var token = jwt.sign({data}, process.env.JWT_SECRETKEY, {expiresIn: process.env.JWT_EXPIRES});
        req.session.userId = data.customer_id;
        req.session.data = data;

        CustomerLogin.getLoans(req.session.userId, (err, loanData) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Some error occurred"
            });
          } 
          req.session.userLoanData = loanData;
        });
        
        //res.send({msg: 'Logged in!',token});
        res.render('user_dashboard',{
          userId : req.session.userId,
          data: req.session.data,
          userLoanData: req.session.loanData,
          token, 
        });
        return;
    } else{
      res.render('login',{
        "code":204,
        "message":"Email or password is incorrect"
      });
      return;
    }
  });
};