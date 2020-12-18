const { updateLoanStatus } = require('../controllers/updateloanstatus.controller');
const sql = require('./db');

const UpdateLoanStatus = function(updateLoanStatus){
    this.status_id = updateLoanStatus.statusId;
};

UpdateLoanStatus.getLoanStatus = function(statusId, result){
    sql.query(`SELECT status FROM process_status WHERE status_id = ${statusId}`, (err, res) => {
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
    // sql.query(`UPDATE process_status SET status = '1' WHERE status_id = statusId`)
};

UpdateLoanStatus.updateLoanStatus = function(statusId, status, result){
    sql.query(`UPDATE process_status SET status = '${status}' WHERE status_id = '${statusId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length){
            console.log('found user: ', res[0]);
            result(null, res[0]);
            return;
        }
    });
};

module.exports = UpdateLoanStatus;