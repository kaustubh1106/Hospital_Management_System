const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    firstName : {
        type:String,
        required :true,
        minLength : [3,"Name should contain more than 3 words"]
    },
    lastName : {
        type:String,
        required :true,
        minLength : [3,"Name should contain more than 3 words"]
    },
    email : {
        type:String,
        required :true,
        validate : [validator.isEmail,"please prpovide correct email"]
    },
    phone : {
        type:String,
        required :true,
        minLength :  [10,"please enter valid phone no"],
        maxLength : [10,"please enter valid phone no"]
    },
    adhaarCard : {
        type:String,
        required :true,
        minLength :  [12,"please enter valid adhaar no"],
        maxLength : [12,"please enter valid adhaar no"]
    },
    dob : {
        type: Date,
        required:[true,"DOB is required"]
    },
    gender : {
        type: String,
        required:[true,"Gender is required"],
        enum : ['Male','Female','Others']
    },
    appointment_date : {
        type: Date,
        required:[true,"appointment date is required"]
    },
    department:{
        type:String,
        required :true,
    },
    doctor:{
        firstName:{
            type:String,
            required :true,
        },
        lastName:{
            type:String,
            required :true,
        }
    },
    hasVisited:{
        type:Boolean,
        required :true,
    },
    doctorID:{
        type: mongoose.Schema.ObjectId,
        required :true,
    },
    patientID:{
        type: mongoose.Schema.ObjectId,
        required :true,
    },
    address:{
        type:String,
        required :true,
    },
    status:{
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }
});


const Appointment = mongoose.model("appointment",appointmentSchema)

module.exports = Appointment