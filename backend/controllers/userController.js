const {ErrorHandler,errorMiddleware} = require ("../middlewares/errorMiddleware.js")
const User = require("../models/userSchema.js")

const patientRegister = async(req,res,next)=>{
    const {_firstName, _lastName, _email, _phone,_adhaarCard,_dob,_gender,_password,_role} = req.body
    if(!_firstName || !_lastName || !_email || !_phone || !_adhaarCard || !_dob || !_gender|| !_password || !_role){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    
    let user = await User.findOne({email : _email})
    if(user){
        return next(new ErrorHandler("Already Registered!!", 400))
    }
    user =  await User.create({
        firstName: _firstName,
        lastName: _lastName,
        email: _email, 
        phone: _phone,
        adhaarCard: _adhaarCard,
        dob: _dob,
        gender: _gender,
        password: _password,
        role: _role,
        })
        res.json({
            status:200,
            message: "saved"
        })
    
}
module.exports = {patientRegister}