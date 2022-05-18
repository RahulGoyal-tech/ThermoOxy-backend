const cloud = require('../models/index');
const code = require('../credentials/credentials');

// Date.UTC(year, month, date ) -> Return number of ms -> Can be used as id for one date

//ADMINS
const addAdmin = async (req,res) => {
    try{
        if (req.body.companySecret != code.companySecret){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const adminCode = await cloud.addAdmin(req.body.adminData);
        res.status(200).send({
            message: 'New Admin Added Successfully',
            adminCode: adminCode,
        });
    } catch(err) {
        console.log(`Error in catch block: ${err}`);
    }
}
const removeAdmin = async (req,res) => {
    try {
        if (req.body.companySecret != code.companySecret){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        if(!(await cloud.removeAdmin(req.body.adminId))){
            return res.status(404).send({
                message: 'Admin Doesn\'t exist.',
            });
        }
        res.status(200).send({
            message: "Admin Removed Successfully",
        });
    } catch(err){
        console.log(`Error in catch block: ${err}`);
    }
}
const getAdmins = async (req,res) => {
    try{
        if (req.headers.companysecret != code.companySecret){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const ids = await cloud.getAdminIds();
        return res.status(200).send({
            message: 'List of Admins Returned Successfully',
            admins: ids,
        });
    }catch(err){
        console.log(`Error in catch block: ${err}`);
    }
}
const getAdmin = async (req,res) => {
    try{
        if (req.headers.companysecret != code.companySecret){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const adminData = await cloud.getAdmin(req.body.adminId);
        if(!adminData){
            return res.status(404).send({
                message: 'Admin Doesn\'t exist.\nPlease Re-check Admin Id'
            });
        }
        return res.status(200).send({
            message: 'Admin Obtained Successfully',
            adminData: adminData.data()
        });
    } catch(err){
        console.log(`Error in catch block is: ${err}`);
    }
}

//EMPLOYEES
const addEmployee = async (req,res) => {
    try {
        if (!(await cloud.doAdminExist(req.body.adminCode))){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const employeeId = await cloud.addEmployee(req.body.employeeData);
        res.status(200).send({
            message: 'New Employee Added Successfully',
            employeeId: employeeId,
        });
    } catch(err){
        console.log(`Error in catch block: ${err}`);
    }
}
const removeEmployee = async (req,res) => {
    try {
        if (!(await cloud.doAdminExist(req.body.adminCode))){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        if(!(await cloud.removeEmployee(req.body.employeeId))){
            return res.status(404).send({
                message: 'Employee Doesn\'t exist.',
            });
        }
        res.status(200).send({
            message: "Employee Removed Successfully",
        });
    } catch(err){
        console.log(`Error in catch block: ${err}`);
    }
}
const getEmployees = async (req,res) => {
    try {
        if (!(await cloud.doAdminExist(req.body.adminCode))){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const ids = await cloud.getEmployeeIds();
        return res.status(200).send({
            message: 'List of Employees Returned Successfully',
            admins: ids,
        });
    } catch(err){
        console.log(`Error in catch block: ${err}`);
    }
}
const getEmployee = async (req,res) => {
    try {
        if (!(await cloud.doAdminExist(req.body.adminCode))){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const employeeData = await cloud.getEmployee(req.body.employeeId);
        if(!employeeData){
            return res.status(404).send({
                message: 'Employee Doesn\'t exist.\nPlease Re-check Employee Id'
            });
        }
        return res.status(200).send({
            message: 'Employee Obtained Successfully',
            employeeData: employeeData
        });
    } catch(err){
        console.log(`Error in catch block is: ${err}`);
    }
}

//ATTENDANCE
const updateAttendance = async (req,res) => {
    try {
        if(!(await cloud.doAdminExist(req.body.Id) || await cloud.doEmployeeExist(req.body.Id))){
            return res.status(404).send({
                message: 'Employee or Admin doesn\'t exists.\nPlease Re-check Id'
            });
        }
        await cloud.updateAttendance(req.body.Id, Date.UTC(req.body.year, req.body.month, req.body.date));
        res.status(200).send({
            message: 'Attendance Added Successfully'
        });
    } catch(err){}
}
const getAttendance = async (req,res) => {
    try {
        if(!(await cloud.doAdminExist(req.body.Id))){
            return res.status(401).send({
                message: 'Unauthorized Access.\nPS: Please Dont try to hack.',
            });
        }
        const presents = await cloud.getAttendance(Date.UTC(req.body.year,req.body.month,req.body.date));
        res.status(200).send({
            message: 'Attendance recieved successfully',
            total: presents.length,
            List: presents
        });
    } catch(err) {
        console.log(`Error is: ${err}`);
    }
}

module.exports = {
    addAdmin,
    removeAdmin,
    getAdmins,
    getAdmin,
    addEmployee,
    removeEmployee,
    getEmployees,
    getEmployee,
    updateAttendance,
    getAttendance,
}