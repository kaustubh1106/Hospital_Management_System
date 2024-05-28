const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const messageRouter = require("./router/messageRouter.js")
const userRouter = require("./router/userRouter.js")
const {dbConnection} = require("./utils/dbConnections.js")
const {errorHandler,errorMiddleware} = require("./middlewares/errorMiddleware.js")

require("dotenv").config()
const app = express()

dbConnection()



app.use(cors(
    {
        origin: [process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
        credentials: true
    }
))
app.use(cookieParser())
app.use(express.json())   //used for json to string conversion
app.use(express.urlencoded({ extended: true} ))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: `/tmp/`
}))
app.use('/api/v1/message',messageRouter)
app.use('/api/v1/user',userRouter)

app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{

    console.log(`${process.env.PORT}`,"server Started")
})