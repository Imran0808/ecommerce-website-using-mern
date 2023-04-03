import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// Route protaction by JWT 
export const  requireSignIn=async(req,res,next)=>{

try {
    //encrypt
    const decode= JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY);
        //pass decode into the user
        req.user=decode;//decrypt
    next();
} catch (error) {
    console.log(error)
}
}
//admin access by jwt 
export const isAdmin=async(req,res,next)=>{
try {
    //user id pass through authController
    const user =await userModel.findById(req.user._id)
    if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:"UnAuthorized Access",
        })
    }
    else{
        next()
    }
} catch (error) {
    console.log(error)
    res.status(401).send({
        success:false,
        error,
        message:"Error in admin middleware",
    })
}
}
