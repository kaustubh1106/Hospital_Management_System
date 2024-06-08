const {catchAsyncErrors} = require("./catchAsyncErrors.js")
const {ErrorHandler,errorMiddleware} = require ("../middlewares/errorMiddleware.js")
const User = require("../models/userSchema.js")
const jwt = require("jsonwebtoken")
const isAdminAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    console.log("ok")
    console.log(req.cookies)
    const token = req.cookies.adminToken
    if(!token){
        return(next(new ErrorHandler("Admin not authenticated!",400)))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler("only Admin",403) )
    }
    next();
})
const isPatientAuthenticated = catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.patientToken
    if(!token){
        return(next(new ErrorHandler("Admin not authenticated!",400)))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler("only Patient",403) )
    }
    next();
})

module.exports = {isAdminAuthenticated,isPatientAuthenticated}