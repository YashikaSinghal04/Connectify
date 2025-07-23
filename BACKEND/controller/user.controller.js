import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"
export const signup =async(req,res)=>{
    const { fullname, email, password, confirmPassword } = req.body;
    try{
        if(password!==confirmPassword){
        return res.status(400).json({error:"Passwords do not match"});
    }
    const user =await User.findOne({email})
    if(user){
  return res.status(400).json({error:"User already exists"})
    }
    const hash = await bcrypt.hash(password,10)
    const newUser = new User({
        fullname,
        email,
        password: hash,
    });
    await newUser.save();

    if(newUser){
        createTokenAndSaveCookie(newUser._id,res);
         res.status(201).json({message:"User created successfully",newUser});

    }
    
    }catch(error){
        res.status(500).json({error:"Something went wrong"})
    }
};
export const login=async(req,res)=>{
     const{email,password}=req.body;
    try{
       
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid user credential"});
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid user credential"});
        }
        createTokenAndSaveCookie(user._id,res);
        res.status(200).json({message:"user logged in successfully",user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }})

    }catch(error){
        res.status(500).json({error:"Internal server error"});
    }
};
export const logout=async(req,res)=>{
    try{
     res.clearCookie("jwt")
     res.status(201).json({message:"user logged out successfully "})
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
}

export const allUser = async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password");
        res.status(201).json(filteredUsers);

    }catch(error){
        res.status(500).json({error:"Error in allUsers Controller:"+ error})
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
   
   
 


