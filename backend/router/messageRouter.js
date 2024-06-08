const express = require("express")
const {sendMessage, getAllMessages} = require("../controllers/messageController.js")
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")
const {isAdminAuthenticated,isPatientAuthenticated} = require("../middlewares/auth.js")
const router = express.Router()

router.post("/send",catchAsyncErrors(sendMessage))
router.get("/getall",isAdminAuthenticated,catchAsyncErrors(getAllMessages))

module.exports = router; 