const express = require("express")
const {patientRegister ,login,adminRegister,getAllDoctors,getUserDetails,logOutAdmin,logOutPatient} = require("../controllers/userController.js")
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")
const {isAdminAuthenticated,isPatientAuthenticated} = require("../middlewares/auth.js")


const router = express.Router()

router.post("/patient/register",catchAsyncErrors(patientRegister))
router.post("/login",catchAsyncErrors(login))
router.post("/admin/addnew",isAdminAuthenticated,catchAsyncErrors(adminRegister))
router.get("/doctors",catchAsyncErrors(getAllDoctors))
router.get("/admin/me",isAdminAuthenticated,catchAsyncErrors(getUserDetails))
router.get("/patient/me",isPatientAuthenticated,catchAsyncErrors(getAllDoctors))
router.get("/admin/logout",isAdminAuthenticated,catchAsyncErrors(logOutAdmin))
router.get("/patient/logout",isPatientAuthenticated,catchAsyncErrors(logOutPatient))
module.exports = router; 