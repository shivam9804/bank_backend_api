const sql = require('./db');

const ApplyNow = function(applynow){
    this.customer_id = applynow.customer_id;
    this.service_id = applynow.service_id;
    this.aadhar_no = applynow.aadhar_no;
    this.pan_card_file_name = applynow.pan_card_file_name;
    this.address_proof_file_name = applynow.address_proof_file_name;
};


ApplyNow.create = (newApplyNow, result) => {
    sql.query("INSERT INTO applies_for SET customer_id = ?, service_id = ?, aadhar_no = ?, pan_card_file_name = ?, address_proof_file_name = ?", 
    [newApplyNow.customer_id, newApplyNow.service_id, newApplyNow.aadhar_no, newApplyNow.pan_card_file_name, newApplyNow.address_proof_file_name], 
    (err, res) => {
        if (err) {
            // console.log("error: ", err);
            result(err, null);
            return;
        }
        sql.query("INSERT INTO process_status SET customer_id = ?, service_id =?", [newApplyNow.customer_id, newApplyNow.service_id], 
        (err, res) => {
            if (err) {
                // console.log("error: ", err);
                result(err, null);
                return;
            }
        });
        // console.log("Customer created: ", {id: res.insertId, ...newCustomer});
        result(null, {id: res.insertId, ...newApplyNow});
    });
};

module.exports = ApplyNow;