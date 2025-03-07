import jwt from 'jsonwebtoken'
import "dotenv/config"
import crypto from 'crypto';


 function generateEmailVerfyToken(email) {
    
    const payload={
            email:email,
            random: crypto.randomUUID()
        }

    
    const verifyToken = jwt.sign(payload, process.env.JWT_VERIFY_KEY)
    return verifyToken;
 }



 export default generateEmailVerfyToken;