const ApplyNow = require("../models/applyNow.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
    }
    
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }
    
    let pan_card_file = req.files.pan_card_file;
    let address_proof_file = req.files.address_proof_file;

    let pan_card_file_name = pan_card_file.name;
    let address_proof_file_name = address_proof_file.name;
    
    pan_card_file.mv('public/uploads/pan_card/'+pan_card_file.name, function(err){
        if (err)
            return res.status(500).send(err)
    });

    address_proof_file.mv('public/uploads/address_proof/'+address_proof_file.name, function(err){
        if (err)
            return res.status(500).send(err)
    });

    // Create a Customernew
    const applynow = new ApplyNow({
      customer_id: req.session.userId,
      service_id: req.body.service_id,
      aadhar_no: req.body.aadhar_no,
      pan_card_file_name: pan_card_file_name,
      address_proof_file_name: address_proof_file_name,
    });
    
    // Save Customer in the database
    ApplyNow.create(applynow, (err, data) => {
        userId = req.session.userId;
        data = req.session.data;
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Customer."
            });
             
        res.render('user_dashboard', {
            userId,
            data,
            message: 'Applied successfully'
        });
    });
};