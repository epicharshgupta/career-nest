import { User } from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/dataurl.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req,res) =>{
    try {
        const {fullname,email,phoneNumber,password,role} = req.body
        // console.log(fullname,email,phoneNumber,password,role);
        
        if(!fullname || !email || !phoneNumber || !password ||!role){
            // console.log(fullname,email,phoneNumber,password,role)
            return res.status(400).json({
                // console.log("kuch nhi aaya")
                message:"Something is missing",
                success:false
            })
        }
        const file=req.file;
        // console.log(file)
        const fileUri=getDataUri(file);
        // console.log(fileUri)

        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        // console.log(user.data)
        if(user){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false
            })
        }3

        const hashedpassword= await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedpassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        });
        console.log(user)
        return res.status(201).json({
            message:"Accout created successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"error in registration",
            success:false
        })
    }
}

export const login= async(req,res)=>{
  try {
    const {email,password,role} = req.body
    if( !email ||  !password ||!role){
        return res.status(400).json({
            message:"Something is missing",
            success:false
        })
    };

    let user=await User.findOne({email})
    
    if(!user){
            return res.status(400).json({
                message:"user not registered through this email",
                success:false
            })
        
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    console.log(isPasswordMatch)
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"password incorrect",
            success:false
        })
    }
    if(role !== user.role){
        return res.status(400).json({
            message:"Account does not exist with current role",
            success:false
        })
    }

    const tokenData={
        userId :user._id
    }

    const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
    user={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
        message:`welcome to job portal ${user.fullname}`,
        success:true,user
    })
  } catch (error) {
    console.log(error)

        return res.status(500).json({
            message:"Error in login",
            success:false
        })
  }
}



export const logOut=async(req,res) =>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged-Out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async(req,res) =>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body;
        console.log(fullname,email,phoneNumber,bio,skills)
        const file=req.file;
        console.log(req.file)

        const fileUri=getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        console.log(cloudResponse)
        // const 
        let skillsArray;
        

        if (skills) {skillsArray=skills.split(",");}
        const userId=req.id;
        // console.log(userId)
        // const { id } = req.params;
        // const updates = req.body; // Get updates from request body

        let user=await User.findById(userId);
        console.log(user.fullname)
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            });
        }
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        if(cloudResponse) {
            user.profile.resume = cloudResponse.secure_url//save the cloudinary url
            user.profile.resumeOriginalName=file.originalname
        }
        await user.save();
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"profile updated successfully",
            success:true,
            user
        });
    } catch (error) {
        console.log(error);
    }
}