import { User } from "../models/userschema";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";

// generate token

const generateToken = (res, payload) =>{
    const token = jwt.sign(payload , process.env.JWT_SECRET , { expiresIn: "1d" })
    res.cookie("token" , token , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "Production",
        sameSite : "strict" , 
        maxAge : 24*60*60*1000
    })
    return token;
}

// Sign up 

const registerUser = async(req,res) =>{
    try {
        const {name , email , password}=req.body;
    if(!name || !email || !password)
    {
        return res.json({message: "Input feild is required"})
    }
    const existingUser = await User.findOne({email})
    if(existingUser)
    {
        return res.json({message : "User already exists" , success : false})
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({name , email , password : hashPassword })
    return res.json({
        message:"User Registered Successfully " , 
        success : true
    })
    } catch (error) {
        console.log(error.message)
        
    }
    

}