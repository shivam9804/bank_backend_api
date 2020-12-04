const sql = require('./db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Employee = function(employee){
    this.employee_full_name = employee.name,
    this.employee_age = employee.age,
    this.employee_gender = employee.gender,
    this.employee_phone_no = employee.phone,
    this.employee_email = employee.email,
    this.employee_address = employee.address,
    this.employee_password = employee.password,
    this.employee_designation = employee.designation
};

Employee.create = (newEmployee, result) => {
    const hash = bcrypt.hashSync(newEmployee.employee_password, saltRounds);
    newEmployee.employee_password = hash;
    sql.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Customer created: ", {id: res.insertId, ...newEmployee});
        result(null, {id: res.insertId, ...newEmployee});
    });
};

Employee.findById = (employeeId, result) => {
    sql.query(`SELECT * FROM employee WHERE employeeId = ${employeeId}`, (err, res) => {
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found user: ",res[0]);
            result(null, res[0]);
            return;
        }
    });
};

Employee.getAll = result => {
    sql.query("SELECT * FROM employee", (err, res) => {
        if (err){
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("found user: ",res);
        result(null, res);
        return;
    });
};

Employee.updateById = (employeeId, employee, result) => {
    sql.query("UPDATE employee SET firstName = ?, lastName =? WHERE employeeId = ?",
    [employee.firstName, employee.lastName, employeeId],
    (err, res) => {
        if (err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0){
            result({kind: "not found"}, null);
            return;
        }
        console.log("updated customer: ", { employeeId: employeeId, ...employee});
        result(null, {employeeId: employeeId, ...employee});
    });
};


Employee.updatePassword = (id, password, result) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  sql.query(
    "UPDATE employee SET employee_password = ? WHERE employee_id = ?",
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


Employee.remove = (employeeId, result) => {
    sql.query("DELETE FROM employee WHERE employeeId = ?", employeeId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found employee with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", employeeId);
      result(null, res);
    });
};

Employee.removeAll = result => {
    sql.query("DELETE FROM employee", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} employee`);
      result(null, res);
    });
};

module.exports = Employee;