const mongoose = require('mongoose')
const dbConnection = ()=>{
    const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
    mongoose.connect(`${process.env.DB_URL}`)
        .then(console.log("Database connected"))
        .catch((error)=>{
            console.log(error)
        })
}

module.exports = {dbConnection}