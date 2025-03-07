import User from "../model/user.js"
import { validationResult } from "express-validator";
import { createHmac } from "crypto";
import confirmEmail from "../emails/confirmEmail.js";
import generateEmailVerfyToken from "../auth/verifyTokenGen.js";
import { generateAuthToken } from "../middleware/auth.js";
import forgotPasswordEmail from "../emails/forgotPassword.js";



async function handelUserSignup(req, res) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

        return res.status(400).json({
        success: false,
        msg: validationErrors.array()[0].msg,
      });
    }

    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          msg: "Email is already registered.",
        });
      }
  
      // Generate verification token
      const verificationToken = generateEmailVerfyToken(email);
  
      // Create new user
      const newUser = await User.create({
        name,
        email,
        password,
        verifyToken: verificationToken,
      });
  
      // Send email confirmation
      const emailSent = await confirmEmail(email, name, verificationToken);
      if (!emailSent) {
        return res.status(500).json({
          success: false,
          msg: "Failed to send email verification.",
        });
      }
  
      return res.status(201).json({
        success: true,
        msg: "User successfully created. Check your email for verification.",
        email: newUser.email,
        name: newUser.name,
      });
    } 
    
    catch (error) {
      return res.status(500).json({
        success: false,
        msg: "An error occurred during signup",
      });
    }
  }
  


async function handelUserSignin(req,res) {
    
    
try{
    const {email,password}=req.body;
    const user= await User.findOne({email:email})

    
   if(!user){
    return res.status(400).json({
        success:false,
        msg:"User not found"
       })
    }


   const newPassword= createHmac("sha256",user.salt)
   .update(password)
   .digest("hex")

    
   if(newPassword!=user.password){
    return res.status(400).json({
        success:false,
        msg:"Incorrect Password"
       })

   }

   if(!user.active){

      return res.status(200).json({
        success:false,
        msg:"Please Verify Account to login",
        active:false,
        email:user.email,
        name:user.name
       })
    }

   const token= generateAuthToken(user);



   return res.status(200).json({
    success:true,
    msg:"Sucessfully logged in",
    token:token,
    email:user.email,
    name:user.name
   })

}

catch(err){
        return res.status(500).json({
          success: false,
          msg: "An error occurred during Login", 
        });
}
}



async function verifyEmail(req,res) {

    try{
        
        const urlVerifyToken= req.params.verifyToken;
        const user=await User.findOne({verifyToken: urlVerifyToken})

        if(!user){
            return res.status(400).send({
                success:false,
                msg:"Incorrect verification Link"
            })
        }
        
        user.active = true;
        user.verifyToken = null;
        await user.save();

        

        return res.status(200).send({
            // Redirect to profile page
            success:true,
            msg:`${user.name} you are sucessfully verified`
        })

    }

    catch(error){

        return res.status(500).send({
          success: false,
          message: "An error occurred during verification",
        });


    }
    
}



async function sendVerifyLink(req,res) {


  try {
    const { name, email } = req.body;

    
    const verificationToken = generateEmailVerfyToken(email);


    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { verifyToken: verificationToken }, 
      {new:true}
    );


    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });
    }
    


    // Send email confirmation
    const emailSent = await confirmEmail(email, name, verificationToken);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        msg: "Failed to send email verification.",
      });
    }

    return res.status(201).json({
      success: true,
      msg:"Verification Link sent"
    });
  } 
  
  catch (error) {
    return res.status(500).json({
      success: false,
      msg: "An error occurred during sending Verification Link",
    });
  }

  
}


async function forgotPassword(req,res) {
    
try{ 
  const{email}=req.body;


  const user= await User.findOne({email:email});

  if(!user){
    return res.status(400).json({
      success:false,
      msg:"User not found"
    })
  }


  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();


  const emailSent = await forgotPasswordEmail(email, user.name, otp);
  if (!emailSent) {
    return res.status(500).json({
      success: false,
      msg: "Failed to send email OTP",
    });
  }

  return res.status(201).json({
    success: true,
    msg:"OTP has been sent to your email"
  });


}

catch (error) {
  return res.status(500).json({
    success: false,
    msg: "Error occurred during sending OTP",
  });
}
}



async function verifyOTP(req,res) {
  
  try{

    const {email,otp}=req.body;

    const user= await User.findOne({email:email});

    if(!user){
     return res.status(400).json({
       success:false,
       msg:"User not found"
     })
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ 
        success: false, 
        msg: "Invalid or expired OTP" });
    } 

    return res.status(200).json({ 
      success: true, 
      msg: "OTP Verified Successfully!" ,
      name:user.name,
      email:user.email
    });


  }

  catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error occurred during verifying OTP",
    });
  }
}



async function resetPassword(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found"
      });
    }

    const newPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    await User.updateOne(
      { email: email }, 
      { $set: { password: newPassword, otp: undefined, otpExpires: undefined } } 
    );


    res.status(200).json({
      success: true,
      msg: "Password reset successful"
    });
  } 
  
  catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error occurred during password reset" 
    });
  }
}

export {handelUserSignin,handelUserSignup,verifyEmail, sendVerifyLink, forgotPassword,verifyOTP, resetPassword};