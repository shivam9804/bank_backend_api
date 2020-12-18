const { json } = require('body-parser');
const express = require('express');
let router = express.Router();

router.get('/', (req,res) => {
    userId = req.session.userId;
    res.render('index',{
        userId
    });
});

router.get('/signup', (req,res) => {
    res.render('signup');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/profile', (req,res) => {
    res.render('profile');
});

router.get('/products', (req, res) => {
    res.render('products');
});

router.get('/dreamhomeloan', (req, res) => {
    res.render('dreamhomeloan');
});

router.get('/businessloan', (req, res) => {
    res.render('businessloan');
});

router.get('/microhousingloan', (req, res) => {
    res.render('microhousingloan');
});

router.get('/user_dashboard', (req,res) =>{
    userId = req.session.userId;
    data = req.session.data;
    res.render('user_dashboard', {
        userId,
        data
    });
});

router.get('/loans', (req,res) =>{
    userId = req.session.userId;
    userEmail = req.session.userEmail;
    data = req.session.data;
    userLoanData = req.session.userLoanData
    for(var i = 0; i < userLoanData.length; i++){
        if (userLoanData[i].status == 1) {
            userLoanData[i].phase = 'Validation';
        } else if (userLoanData[i].status == 2){
            userLoanData[i].phase = 'Physical Inspection';
        } else if (userLoanData[i].status == 3){
            userLoanData[i].phase = 'Re-validation';
        } else if (userLoanData[i].status == 4){
            userLoanData[i].phase = 'Final-paperwork';
        } else if (userLoanData[i].status == 5){
            userLoanData[i].phase = 'Sanction';
        } else {
            userLoanData[i].phase = 'Sanction';
        }
    }
    res.render('loans', {
        userId,
        userEmail,
        data,
        userLoanData
    });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/apply_now', (req, res) => {
    userId = req.session.userId;
    res.render('apply_now',{
        userId
    });
});

router.get('/get_in_touch', (req,res) => {
    res.render('get_in_touch');
});

router.get('/change_password', (req,res) => {
    userId = req.session.userId;
    res.render('change_password', {
        userId
    });
});

// employee pages routes

router.get('/employee_login', (req, res) => {
    res.render('employee_login');
});

router.get('/add_employee', (req, res) => {
    res.render('add_employee');
});

router.get('/employee_dashboard', (req,res) =>{
    empId = req.session.empId;
    empData = req.session.empData;
    res.render('employee_dashboard', {
        empId,
        empData
    });
});

router.get('/employee_loans', (req, res) => {
    empId = req.session.empId;
    allUserLoanData = req.session.allUserLoanData;
    for(var i = 0; i < allUserLoanData.length; i++){
        if (allUserLoanData[i].status == 1) {
            allUserLoanData[i].phase = 'Validation';
        } else if (allUserLoanData[i].status == 2){
            allUserLoanData[i].phase = 'Physical Inspection';
        } else if (allUserLoanData[i].status == 3){
            allUserLoanData[i].phase = 'Re-validation';
        } else if (allUserLoanData[i].status == 4){
            allUserLoanData[i].phase = 'Final-paperwork';
        } else if (allUserLoanData[i].status == 5){
            allUserLoanData[i].phase = 'Sanction';
        }else {
            allUserLoanData[i].phase = 'Sanction';
        }
    }
    res.render('employee_loans',{
        empId,
        allUserLoanData
    });
});

router.get('/employee_customers_list', (req, res) => {
    empId = req.session.empId;
    allUserData = req.session.allUserData;
    res.render('employee_customers_list', {
        empId,
        allUserData
    });
});

router.get('/employee_change_password', (req, res) => {
    empId = req.session.empId;
    res.render('employee_change_password', {
        empId
    });
});

module.exports = router;