const sql = require('./db');

//constructor
const CustomerLogin = function(customerLogin){
    this.email = customerLogin.email;
    this.password = customerLogin.password;
};

CustomerLogin.login = (loginCredentials, result) => {
    sql.query(`SELECT * FROM customer WHERE customer_email = '${loginCredentials.email}'`, (err, res) => {
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

CustomerLogin.getLoans = (customerId, loanData) => {
    sql.query(`SELECT * FROM customer, service, process_status WHERE process_status.customer_id = customer.customer_id AND 
    process_status.service_id = service.service_id AND process_status.customer_id = '${customerId}'`, (err, res) => {
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

module.exports = CustomerLogin;