const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = require("../models/user")

const register = async(req,res)=>{
  const {name,email,password,role} = req.body
  try {
  const existEmail = await userSchema.findOne({email})
  if(existEmail) return res.status(400).json({message:"email already exist!"})
  const hashpassword = await bcrypt.hash(password, 10)
  const user = await userSchema.create({name,email,password:hashpassword, role: role ==="admin"?"admin":"user"})
  const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1d" })
  res.cookie("token", token,{
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  })
  res.status(201).json({message: "user registered successfully",user})
  } catch (error) {
    res.status(500).json("server error")
  }
}

const login = async(req,res)=>{
 const {email,password} = req.body
 try {
    const existUser = await userSchema.findOne({email})
    if(!existUser) return res.status(400).json("Invalid Credentials")
    const match = await bcrypt.compare(password, existUser.password)
    if(!match) return res.status(400).json("Invalid Credentials")
    const token = jwt.sign({id: existUser._id, role: existUser.role}, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token,{
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  })
  res.status(201).json({message: "Logged In Successfully",
  user: { id: existUser._id, name: existUser.name, email: existUser.email, role: existUser.role, }})     
 } catch (error) {
     res.status(500).json("server error")
 }
} 

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const restoreAuth =(req,res)=>{
  res.json({user: req.user})
}
module.exports = {register,login,logout, restoreAuth}