const express = require("express")
const {patientRegister ,login,adminRegister} = require("../controllers/userController.js")
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")


const router = express.Router()

router.post("/patient/register",catchAsyncErrors(patientRegister))
router.post("/login",catchAsyncErrors(login))
router.post("/admin/addnew",catchAsyncErrors(adminRegister))
module.exports = router; 