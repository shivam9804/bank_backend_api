const UpdateLoanStatus = require('../models/updateloanstatus.model');

exports.updateLoanStatus = (req, res) => {
    statusId = req.body.statusId;
    UpdateLoanStatus.getLoanStatus(statusId, (err, res) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
            return;
        }
        console.log('success');
        var status = res.status;
        if(status == 1){
            status = 2;
        } else if(status == 2){
            status = 3;
        } else if(status == 3){
            status = 4;
        } else if(status == 4){
            status = 5;
        } else if(status == 5){
            status = 5;
        } else {
            status = 5;
        }
        
        UpdateLoanStatus.updateLoanStatus(statusId, status, (err, res) => {
            if(err) {
                res.status(500).send({
                    message: err.message || "Some error occurred"
                });
                console.log('error');
                return;
            } else {
                console.log('updated');
                res.render('employee_loan');
                return;
            }
        });
    });
};