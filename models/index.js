const firestore = require('../utils/firestore');
const fireAdmins = firestore.collection('Admins');
const fireEmployee = firestore.collection('Employee');
const fireAttendance = firestore.collection('Attendance');
//ADMINS
const addAdmin = async (adminData) => {
    try {
        const AdminId = await fireAdmins.add(adminData);
        await fireAdmins.doc(AdminId.id).update({Id: AdminId.id});
        return AdminId.id;
    } catch(err) {
        console.log(`Error Is: ${err}`);
    }
}
const removeAdmin = async (adminId) => {
    try {
        const doc = await fireAdmins.doc(adminId).get();
        if(!doc.exists){
            return false;
        }
        await fireAdmins.doc(adminId).delete();
        return true;
    } catch(err) {
        console.log(`Error is: ${err}`);
    }
}
const getAdmin = async (adminId) =>  {
    try {
        const admin = await fireAdmins.doc(adminId).get();
        if(!admin.exists){
            return false;
        }
        return admin;
    } catch(err){
        console.log(`Error is: ${err}`);
    }
}
const getAdminIds = async () => {
    try{
        const ids = await fireAdmins.listDocuments();
        const AdminIds = ids.map(document => document.id);
        return AdminIds;
    } catch (err){
        console.log(err);
    }
};
const doAdminExist = async (adminId) => {
    try {
        if(await (await fireAdmins.doc(adminId).get()).exists){
            return true;
        }
        return false;
    } catch(err){
        console.log(`Error is: ${err}`);
    }
}

//EMPLOYEES
const addEmployee = async (employeeData) => {
    try {
        const employee = await fireEmployee.add(employeeData);
        await fireEmployee.doc(employee.id).update({Id: employee.id});
        return employee.id;
    } catch(err) {
        console.log(`Error Is: ${err}`);
    }
}
const removeEmployee = async (employeeId) => {
    try {
        const doc = await fireEmployee.doc(employeeId).get();
        if(!doc.exists){
            return false;
        }
        await fireEmployee.doc(employeeId).delete();
        return true;
    } catch(err) {
        console.log(`Error is: ${err}`);
    }
}
const getEmployeeIds = async () => {
    try{
        const ids = await fireEmployee.listDocuments();
        const EmployeeIds = ids.map(document => document.id);
        return EmployeeIds;
    } catch (err){
        console.log(err);
    }
}
const getEmployee = async (employeeId) => {
    try {
        const employee = await fireEmployee.doc(employeeId).get();
        if(!employee.exists){
            return false;
        }
        return employee;
    } catch(err){
        console.log(`Error is: ${err}`);
    }
}
const doEmployeeExist = async (employeeId) => {
    try {
        if(await (await fireEmployee.doc(employeeId).get()).exists){
            return true;
        }
        return false;
    } catch(err){
        console.log(`Error is: ${err}`);
    }
}

//ATTENDANCE
const getAttendance = async (dateNumber) => {
    try{
        const presents = await fireAttendance.doc(String(dateNumber)).get();
        return presents.data();
    } catch (err) {
        console.log(`Error is: ${err}`);
    }
}
const updateAttendance = async (Id,dateNumber) => {
    try {
        dateNumber = String(dateNumber);
        const attendance = await fireAttendance.doc(dateNumber).get();
        if(attendance.data()){
            let dataObt = attendance.data().presents;
            const data = [...dataObt, Id];
            await fireAttendance.doc(dateNumber).set({presents: data});
        }
        else {
            await fireAttendance.doc(dateNumber).set({presents: [Id]});
        }
    } catch(err){
        console.log(`Error is: ${err}`);
    }
}


module.exports = {
    addAdmin,
    removeAdmin,
    getAdmin,
    getAdminIds,
    doAdminExist,
    addEmployee,
    removeEmployee,
    getEmployeeIds,
    getEmployee,
    doEmployeeExist,
    getAttendance,
    updateAttendance,
};