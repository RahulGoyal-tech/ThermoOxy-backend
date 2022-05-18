const express = require('express');
const controller = require('../controllers/index');

const app = express();

//ADMINS
app.get('/getAdmins',controller.getAdmins);
app.post('/getAdmin',controller.getAdmin);
app.post('/addAdmin',controller.addAdmin);
app.post('/removeAdmin',controller.removeAdmin);

//EMPLOYEES
app.post('/addEmployee',controller.addEmployee);
app.post('/removeEmployee',controller.removeEmployee);
app.post('/getEmployee', controller.getEmployee);
app.post('/getEmployees',controller.getEmployees);

//ATTENDANCE
app.post('/updateAttendance',controller.updateAttendance);
app.post('/getAttendance',controller.getAttendance);

module.exports = app