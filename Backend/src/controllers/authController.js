import { User } from "../models/userschema.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

// generate token

const generateToken = (res, payload) =>{
    const token = jwt.sign(payload , process.env.JWT_SECRET , { expiresIn: "1d" })
    res.cookie("token" , token , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict" , 
        maxAge : 24*60*60*1000
    })
    return token;
}

// Sign up 

export const registerUser = async(req,res) =>{
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

// Login  
export const loginUser = async(req, res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password)
        {
            return res.json({message: `Please Enter Email and password`})
        }
        const user = await User.findOne({email})
        if(!user)
        {
           if (!user) {
  return res.status(404).json({ message: "User does not exist" });
}
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword)
        {
            return res.json({message : `Invalid Credential `})
        }
        generateToken(res , {id: user._id , role : user.isAdmin?"admin" : "user"})
        res.json({
            message:"User logged in successfully ", 
            success : true,
            user: {
                name : user.name,
                email : user.email
            }
        })
    } catch (error) {
        console.log(error.message);
         return res.status(500).json({ message: "Server error" });
        
    }
}
// logout User
export const logoutUser = async(req, res)=>{
    try {
        res.clearCookie("token")
        return res.json({message: "User Logged Out Successfully" , success : true})
    } catch (error) {
        console.log(error.message);       
    }
}
// admin login
export const adminLogin = async(req, res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password)
        {
            return res.json({message: "Please fill all the fields "})
        }
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        if(email!==adminEmail || password!==adminPassword)
        {
            return res.json({message : "Invalid Credentials" , success : true})
        }
        const token = jwt.sign({email} , process.env.JWT_SECRET , {
            expiresIn : "1d"
        })
        res.cookie("token" , token , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict" , 
        maxAge : 24*60*60*1000
    })
    return res.json({message : "Admin logged in successfully " , success: true})

    } catch (error) {
        
    }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

