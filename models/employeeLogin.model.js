const sql = require('./db');

//constructor
const EmployeeLogin = function(employeeLogin){
    this.email = employeeLogin.email;
    this.password = employeeLogin.password;
};

EmployeeLogin.login = (loginCredentials, result) => {
    sql.query(`SELECT * FROM employee WHERE employee_email = '${loginCredentials.email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length){
            // console.log('found user: ', res[0]);
            result(null, res[0]);
            return;
        }
    });
};

EmployeeLogin.getLoans = loanData => {
    sql.query(`SELECT customer.customer_full_name, service.service_name, service.size, service.tenure, service.details, 
            service.required_documents, process_status.status, process_status.status_id from customer, service, process_status 
            WHERE customer.customer_id = process_status.customer_id AND service.service_id = process_status.service_id AND 
            process_status.status <= 5`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            loanData(err, null);
            return;
        }
        if (res.length){
            // console.log('found user: ', res);
            loanData(null, res);
            return;
        }
});
};

module.exports = EmployeeLogin;