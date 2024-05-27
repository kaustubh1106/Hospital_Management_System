const Message = require("../models/messageSchema.js")
const sendMessage = async(req,res,next)=>{
    const {firstName, lastName, email, phone, message} = req.body
    if(!firstName || !lastName || !email || !phone || !message){
        return res.status(404).json({
            success: true,
            message: "please fill the full FOrm" ,
        })
    }
    await Message.create({firstName,lastName,email,phone,message})
}
module.exports = {sendMessage}