const express = require("express")
const router = express.Router()
const {catchAsyncErrors} = require("../middlewares/catchAsyncErrors.js")
const {postAppointment,getAllAppointments, updateAppointmentStatus, deleteAppointment}=require("../controllers/appointmentController.js")
const {isAdminAuthenticated,isPatientAuthenticated} = require("../middlewares/auth.js")

router.post("/post",isPatientAuthenticated ,catchAsyncErrors(postAppointment))
router.get("/getall",isAdminAuthenticated ,catchAsyncErrors(getAllAppointments))
router.put("/update/:id",isAdminAuthenticated ,catchAsyncErrors(updateAppointmentStatus))
router.delete("/delete/:id",isAdminAuthenticated ,catchAsyncErrors(deleteAppointment))


module.exports = router;