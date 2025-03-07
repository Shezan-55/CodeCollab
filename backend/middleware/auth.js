import jwt from "jsonwebtoken"
import "dotenv/config"

function generateAuthToken(user) {

    const payload={
        email:user.email,
        name:user.name
    }

    const token= jwt.sign(payload,process.env.TOKEN_SECRET_KEY)

    return token;
    
}



function validateAuthToken(token) {
    try{
    const payload = jwt.verify(token,process.env.TOKEN_SECRET_KEY)
    return payload;

    }

    catch(err){
        throw new Error("Invalid or expired token");

    }
    
    
}


function checkAuthToken() {

    return (req,res,next)=>{
        
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){

         return res.status(401).send({
            success: false,
            msg: "Authentication required" 
            });

        }

    try{
         
        const userPaylaod= validateAuthToken(token)
        req.user=userPaylaod;

        next();

    }


    catch(error){

        return res.status(401).send({
            success: false,
            msg: "Invalid token"
        });

    }


    }

    
}



export { generateAuthToken, validateAuthToken, checkAuthToken }