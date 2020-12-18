const sql = require('./db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//constructor
const Customer = function(customer){
  this.customer_full_name = customer.name;
  this.customer_email = customer.email;
  this.profession = customer.profession;
  this.age = customer.age;
  this.password = customer.password;
  this.customer_phone_no = customer.phone;
  this.customer_address = customer.address;
  this.company_name = customer.company;
  this.gender = customer.gender;
};

Customer.create = (newCustomer, result) => {
  const hash = bcrypt.hashSync(newCustomer.password, saltRounds);
  newCustomer.password = hash;
  sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log("Customer created: ", {id: res.insertId, ...newCustomer});
    result(null, {id: res.insertId, ...newCustomer});
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customer WHERE customer_id = ${customerId}`, (err, res) => {
    if (err) {
      // console.log("error: ", error);
      result(err, null);
      return;
    }
    if (res.length) {
      // console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    // console.log("customer: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
  "UPDATE customer SET email = ?, name = ?, address = ?, phone = ? WHERE id = ?",
  [customer.email, customer.name, customer.address, customer.phone, id],
  (err, res) => {
  if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
  }

  if (res.affectedRows == 0) {
    result({ kind: "not_found" }, null);
    return;
  }

  console.log("updated customer: ", { id: id, ...customer });
  result(null, { id: id, ...customer });
  });
};

Customer.updatePassword = (id, password, result) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  sql.query(
    "UPDATE customer SET password = ? WHERE customer_id = ?",
    [password, id],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }
    
    result(null, { id: id});
    });
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customer WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;