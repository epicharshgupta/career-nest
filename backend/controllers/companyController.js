import {Company} from '../models/companyModel.js'
import { v2 as cloudinary } from 'cloudinary';
import getDataUri from '../utils/dataurl.js';

export const registerCompany = async(req,res) =>{
    try {
        const {name} = req.body;
        // console.log(name+"hello")
        if(!name){
            return res.status(400).json({
                message:"company name is required",
                success:false
            })
        }
        let company=await Company.findOne({name:name});
        if(company){
            return res.status(400).json({
                message:"you cant register with same company name",
                success:false
            })
        }
        company = await Company.create({
            name:name,
            userId:req.id
        })
        // console.log(company)
        return res.status(201).json({
            message:"Company registerd successfully",
            success:true,
            company
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompany=async(req,res) => {
    try {
        const userId=req.id
        const companies=await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Companies fetched",
            companies,
            success:true,
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCompanyById=async(req,res) => {
    try {
        const companyId=req.params.id
        const company=await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCompany = async(req,res) =>{
    try {
        const {name,description,website,location} =req.body;
        // console.log(name,description,website,location)
        const file=req.file
        // console.log(file.data)
        //cloudinary todo
        const fileUri = getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
        const logo=cloudResponse.secure_url

        const updateData={name,description,website,location,logo};
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"company updation successfull",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}