const catchAsyncErrors = (theFunctions)=>{
    return async (req,res,next) =>{
       try{
            await theFunctions(req,res,next);
       }catch(error){
        next(error);
       }
    }
}