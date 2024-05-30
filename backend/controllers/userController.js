const {ErrorHandler,errorMiddleware} = require ("../middlewares/errorMiddleware.js")
const User = require("../models/userSchema.js")
const {generateToken} = require("../utils/jwtToken.js")

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
        generateToken(user,"Patient Registered succesfully",200,res)
}

const login = async(req,res,next)=>{
    const {_email,_password,_confirmpassword,_role} = req.body
    if(!_email || !_password ||!_confirmpassword || !_role){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    if(_password!== _confirmpassword){
        return next(new ErrorHandler("password and confirm password doesnt match", 400))
    }
    let user = await User.findOne({email : _email}).select("+password")   //+ is required and select is used to get the value of select attribute in Schema
    if(!user){
        return next(new ErrorHandler("noot Registered!!", 400))
    }
    //User.comparePassword ❌ user.comparePassword✅
    const isPasswordMatched = await user.comparePassword(_password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("wrong password", 400))
    }
    if(_role !== user.role){
        return next(new ErrorHandler("wrong role provided", 400))
    }
    generateToken(user,"LOGIN succesfully",200,res)
 
}
const adminRegister = async(req,res,next)=>{
    const {_firstName, _lastName, _email, _phone,_adhaarCard,_dob,_gender,_password} = req.body
    if(!_firstName || !_lastName || !_email || !_phone || !_adhaarCard || !_dob || !_gender|| !_password ){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    const admin = await User.findOne({email : _email})
    if(admin){
        return next(new ErrorHandler("Already Registered!!", 400))
    }
    const admin2 =  await User.create({
        firstName: _firstName,
        lastName: _lastName,
        email: _email, 
        phone: _phone,
        adhaarCard: _adhaarCard,
        dob: _dob,
        gender: _gender,
        password: _password,
        role: 'Admin'
        })
    generateToken(admin2,"Admin Registered succesfully",200,res)
}
module.exports = {patientRegister , login, adminRegister}