const {ErrorHandler,errorMiddleware} = require ("../middlewares/errorMiddleware.js")
const Appointment = require("../models/appointmentSchema.js")
const User = require("../models/userSchema.js")

const postAppointment = async(req,res,next)=>{
    const {
        _firstName,
        _lastName,
        _email,
        _phone,
        _adhaarCard,
        _dob,
        _gender,
        _department,
        _doctor_firstName,
        _doctor_lastName,
        _hasVisited,
        _address
    } = req.body;
    if(
        !_firstName ||
        !_lastName ||
        !_email ||
        !_phone ||
        !_adhaarCard ||
        !_dob ||
        !_gender ||
        !_department ||
        !_doctor_firstName ||
        !_doctor_lastName ||
        !_hasVisited ||
        !_address
    ){
        return next(new ErrorHandler("Please fill full form!",400))
    }
    const isConflict = await User.find(
        {
            firstName: _doctor_firstName,
            lastName: _doctor_lastName,
            role:"Doctor",
            doctorDepartment: _department,
        }
    )
    if(isConflict.length===0){
        return next(new ErrorHandler("No Doctor Found",400))
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Conflict error: two doctor of same name Please contact the doctor through email!",400))
    }
    else{
        const _doctorID = isConflict[0]._id;
        const _patientID = req.body._id;
        const appointment = await Appointment.create({
            firstName:_firstName,
            lastName:_lastName,
            email:_email,
            phone:_phone,
            adhaarCard:_adhaarCard,
            dob:_dob,
            gender:_gender,
            department:_department,
            doctor:{
                doctor_firstName:_doctor_firstName,
                doctor_lastName:_doctor_lastName,
            },
            hasVisited:_hasVisited,
            address:_address,
            doctorID: _doctorID,
            patientID: _patientID,
        })

        req.status(200).json({
            success:true,
            message: "Appointment Sent Successfully!",
        })
    }
}

const getAllAppointments = async(req,res,next)=>{
    const appointments = await Appointment.find()
    res.status(200).json({
        success:true,
        appointments
    })
}

//Will change it to doctor from admin
const updateAppointmentStatus = async (req,res,next)=>{
    const {id} = req.params
    let appointment  = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",400))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body,{
        new:true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        appointment
    })
}
const deleteAppointment = async (req,res,next)=>{
    const {id} = req.params
    let appointment  = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found",400))
    }
    await appointment.deleteOne()
    res.status(200).json({
        success:true,
        message:"appointment deleted successfully!"
    })

}
module.exports={postAppointment , getAllAppointments, updateAppointmentStatus, deleteAppointment}