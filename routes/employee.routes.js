const express = require('express');
const employee = require('../controllers/employee.controller');
let router = express.Router();

router.post('/', employee.create);
router.post('/changepassword', employee.updatePassword);
router.get('/', employee.findAll);
router.delete('/', employee.deleteAll);

// router.route("/:employeeId")
router.put("/:employeeId", employee.update);
router.get("/:employeeId", employee.findOne);
router.delete("/:employeeId", employee.delete);

module.exports = router;