const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const Schema = mongoose.Schema

const userSchema = new Schema({
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
    password : {
        type:String,
        required :true,
        minLength : [8,"strong password, must contain 8 caracters"],
        select : false //**imp */
    },
    role : {
        type: String,
        required:[true,"role is required"],
        enum : ['Admin','Patient','Doctor']
    },
    doctorDepartment : {
        type : String
    },
    docAvatar : {
        public_id: String,
        url: String
    }
});

userSchema.pre("save",async (next)=>{
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async (enteredPassword)=>{
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.generateJsonWebToken = ()=>{
    return jwt.sign(
    {
        id:this._id
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:process.env.JWT_EXPIRES}
    )
}

const User = mongoose.model("user",userSchema)

module.exports = User