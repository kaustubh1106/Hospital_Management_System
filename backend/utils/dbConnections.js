const mongoose = require('mongoose')
const dbConnection = ()=>{
    const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
    mongoose.connect(`mongodb+srv://${process.env.DB_EMAIL}:${encodedPassword}@job.nrad5pb.mongodb.net/?retryWrites=true&w=majority&appName=Job`)
        .then("Database connected")
}

module.exports = dbConnection