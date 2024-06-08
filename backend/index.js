const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const cloudinary = require("cloudinary").v2
const fileUpload = require("express-fileupload")
const messageRouter = require("./router/messageRouter.js")
const userRouter = require("./router/userRouter.js")
const appointmentRouter = require("./router/appointmentRouter.js")
const {dbConnection} = require("./utils/dbConnections.js")
const {errorHandler,errorMiddleware} = require("./middlewares/errorMiddleware.js")

require("dotenv").config()
const app = express()

dbConnection()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRETKEY
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())   //used for json to string conversion
app.use(express.urlencoded({ extended: true} ))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: `/tmp/`
}))
app.use('/api/v1/message',messageRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/appointment',appointmentRouter)


app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{

    console.log(`${process.env.PORT}`,"server Started")
})