class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}
const errorMiddleware = (err,req,res,next)=>{
    err.message=err.message || "Internal Server Errror!!"
    err.statusCode=err.statusCode || 500
    if(err.code === 11000){            //Error from code base if some thing already exist
        const message = `Dupliucate ${Object.keys(err.keyValue)}  Entered`;
        err = new ErrorHandler(message,400)
    }
    if(err.name === "JsonWebTokenError"){           
        const message = `JWT is Invalid try aghain`;
        err = new ErrorHandler(message,400)
    }
    if(err.name === "TokenExpired"){            
        const message = `JWT is Expired try aghain`;
        err = new ErrorHandler(message,400)
    }
    if(err.name === "CastError"){            
        const message = `Invalid ${err.path}`;        //if entered data is not of the field type
        err = new ErrorHandler(message,400)
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
module.exports = {ErrorHandler,errorMiddleware}