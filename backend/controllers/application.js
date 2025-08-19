import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "job id is required",
                success: false
            })
        }

        //check if user already applied for this job
        const existingApllication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApllication) {
            return res.status(400).json({
                message: "you have Already applied for this job",
                success: false
            })
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "job not found",
                success: false
            })
        }
        //create a new applicant 
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Application created successfully/job appplied successfully",

            success: true
        })
    } catch (error) {
        console.log(error);

    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },

            }
        })
        if (!application) {
            return res.status(404).json({
                message: "application not found/no application",
                success: false
            })
        }
        return res.status(200).json({
            message: "application fetched",
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }

        });
        if(!job){
            return res.status(400).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}


export  const updateStatus = async(req,res) =>{
    try {
        const {status} =req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status required",
                success: false
            })
        }

        //find the application by application id
        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({
                message: "application not found",
                success: false
            })
        }
        //update the status
        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}