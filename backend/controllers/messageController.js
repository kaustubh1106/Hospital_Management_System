const Message = require("../models/messageSchema.js")
const {ErrorHandler,errorMiddleware} = require ("../middlewares/errorMiddleware.js")

const sendMessage = async(req,res,next)=>{
    const {_firstName, _lastName, _email, _phone, _message} = req.body
    if(!_firstName || !_lastName || !_email || !_phone || !_message){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    
        await Message.create({
        firstName : _firstName,
        lastName : _lastName,
        email : _email,
        phone : _phone,
        message : _message
        })
        res.json({
            status:200,
            message: "saved"
        })
    
}

const getAllMessages = async(req,res,next)=>{
    const message = await Message.find();
    console.log(message)
    res.status(200).json({
        success:true,
        message,
    })
}

module.exports = {sendMessage,getAllMessages}