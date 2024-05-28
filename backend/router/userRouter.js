const express = require("express")
const {patientRegister} = require("../controllers/userController.js")
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")


const router = express.Router()

router.post("/patient/register",catchAsyncErrors(patientRegister))

module.exports = router; 