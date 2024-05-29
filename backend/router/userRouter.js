const express = require("express")
const {patientRegister ,login} = require("../controllers/userController.js")
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")


const router = express.Router()

router.post("/patient/register",catchAsyncErrors(patientRegister))
router.post("/login",catchAsyncErrors(login))

module.exports = router; 