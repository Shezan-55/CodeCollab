import { createHmac, randomBytes } from "crypto";
import {Schema,model} from "mongoose"

const userSchema=new Schema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },

    salt:{
        type:String,
        require: true,
    },

    password:{
        type:String,
        require:true
    },

    active:{
        type:Boolean,
        default:false
    },

    verifyToken:{
        type:String,
    },

    otp: { 
        type: String 
    },

    otpExpires: { 
        type: Date 
    }
},
{timestamps: true}
);




userSchema.pre("save", function(next) {
   
    const user= this;

    if(!user.isModified('password'))  {
       return  next();
    }

    
    const salt= randomBytes(16).toString();

    const hashedPassword= createHmac("sha256",salt)
    .update(this.password)
    .digest("hex")

    this.salt=salt;
    this.password=hashedPassword;


    next();
})


const user= model("user",userSchema)

export default user;