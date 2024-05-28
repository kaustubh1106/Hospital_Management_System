const express = require("express")
const {sendMessage} = require("../controllers/messageController.js")
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")


const router = express.Router()

router.post("/send",catchAsyncErrors(sendMessage))

module.exports = router; 