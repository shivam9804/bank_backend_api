const express = require('express');
let router = express.Router();

router.post('/', (req,res) => {
    req.session.destroy((err) => {
        if(err) {
        console.log(err);
        } else {
        res.redirect('/');
        }
    });
});

module.exports = router;
