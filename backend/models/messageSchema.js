const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
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

});

const Message = mongoose.model("message",MessageSchema)

module.exports = Message