const {ErrorHandler,errorMiddleware} = require ("../middlewares/errorMiddleware.js")
const User = require("../models/userSchema.js")
const {generateToken} = require("../utils/jwtToken.js")
const cloudinary = require("cloudinary")
const patientRegister = async(req,res,next)=>{
    const {_firstName, _lastName, _email, _phone,_adhaar,_dob,_gender,_password} = req.body
    console.log(_adhaar)
    if(!_firstName || !_lastName || !_email || !_phone || !_adhaar || !_dob || !_gender|| !_password ){
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
        adhaarCard: _adhaar,
        dob: _dob,
        gender: _gender,
        password: _password,
        role: "Patient",
        })
        generateToken(user,"Patient Registered succesfully",200,res)
}

const login = async(req,res,next)=>{
    const {_email,_password,_confirmPassword,_role} = req.body
    console.log(_email)
    if(!_email || !_password ||!_confirmPassword || !_role){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    if(_password!== _confirmPassword){
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
    console.log(_dob)
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

const getAllDoctors = async(req,res,next)=>{
    const doctors = await User.find({role: "Doctor"})
    res.status(200).json({
        success:true,
        doctors
    })
}

const getUserDetails = async(req,res,next)=>{
    const user = req.user
    console.log(user)
    console.log("req user: ", req.user)
    if(user){
        res.status(200).json({
            success:true,
            user
        })
    }
    else{
        next(new ErrorHandler("please login!", 400))
    }
}

const logOutAdmin = async(req,res,next)=>{
    res.status(200).cookie("adminToken", "",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message : "Admin Logout successfully"
    })
    
}

const logOutPatient = async(req,res,next)=>{
    res.status(200).cookie("patientToken", "",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message : "User Logout successfully"
    })
}

const addNewDoctor = async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler(" Avatar is required!", 400))
    }
    const{ _docAvatar} = req.files
    const allowedFormats = ["image/png","image/jpg","image/jpeg","image/webp"]
    if(!allowedFormats.includes(_docAvatar.mimetype)){
        return next(new ErrorHandler(" Files type not supported!", 400))
    }
    const {_firstName, _lastName, _email, _phone,_adhaar,_dob,_gender,_password,_doctorDepartment} = req.body
    console.log(_email)
    if(!_firstName || !_lastName || !_email || !_phone || !_adhaar || !_dob || !_gender|| !_password || !_doctorDepartment){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    const isRegistered = await User.findOne({email: _email})
    if(isRegistered){
        next(new ErrorHandler(" Already registered with this email!", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        _docAvatar.tempFilePath
    )
    console.log("ok")
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(
            "Cloudinary Error: ",
            cloudinaryResponse.error || "unknown cloudinary error"
        )
    }
    const doctor = await User.create({
        firstName: _firstName,
        lastName: _lastName,
        email: _email, 
        phone: _phone,
        adhaarCard: _adhaar,
        dob: _dob,
        gender: _gender,
        password: _password,
        doctorDepartment: _doctorDepartment,
        role: "Doctor",
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success:true,
        message:"New Doctor Registered!",
        doctor
    })
}

module.exports = {patientRegister , login, adminRegister,getAllDoctors,getUserDetails,logOutAdmin,logOutPatient,addNewDoctor}