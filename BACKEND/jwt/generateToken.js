import jwt from "jsonwebtoken";
const createTokenAndSaveCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN,{
 expiresIn:"10d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,   //xss attack s hme bachayga
        secure:true,
        sameSite:"none"  //csrf attack s bchayga
    });
   
}
export default createTokenAndSaveCookie;
