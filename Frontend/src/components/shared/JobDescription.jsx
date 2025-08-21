import { Badge } from "@/components/ui/badge"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
// import useGetSingleJob from "../../hooks/useGetSingleJob"
import axios from "axios"
import { setSingleJob } from "../../redux/jobslice"
import { useDispatch, useSelector } from "react-redux"
import {job_API_ENDPOINT} from '../../utils/constant.jsx'
import {application_API_ENDPOINT} from '../../utils/constant.jsx'
import { toast } from "sonner"


const JobDescription = () => {
    const params=useParams();
    const jobId=params.id;
    const {singleJob}=useSelector(store=>store.job);
    const {user}=useSelector(store=>store.auth)
    

    const isinitiallyApplied=singleJob?.applications?.some(application=>application.applicant===user?._id)||false;
    const [isApplied,setIsApplied]=useState(isinitiallyApplied);
    const applyJobHandler = async () =>{
        try {
            const res= await axios.get(`${application_API_ENDPOINT}/apply/${jobId}`,{withCredentials:true});
            if(res.data.success){
                console.log(res.data);
                setIsApplied(true);
                const updateSingleJob={
                    ...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]
                }
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message)

                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }

    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleJob= async () =>{
            try {
                const res=await axios.get(`${job_API_ENDPOINT}/get/${jobId}`);
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSingleJob();
      },[jobId,dispatch,user?.id])
  return (
    <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
            <div className=''>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge variant='ghost' className='text-blue-700 font-bold'>{singleJob?.position}</Badge>
                    <Badge variant='ghost' className='text-[#F83002] font-bold'>{singleJob?.jobType}</Badge>
                    <Badge variant='ghost' className='text-[#7209B7] font-bold'>{singleJob?.salary}</Badge>
                </div>  
            </div>    
            <Button onClick={isApplied?null:applyJobHandler}
            disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed':'bg-[#7209b7] hover:bg-red-800' }`}>{isApplied?'Already applied':'Apply Now'}</Button>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium my-4 py-4">job Description</h1>
        <div className="my-4">
            <h1 className="font-bold my-1">Role : <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
            <h1 className="font-bold my-1">Location : <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
            <h1 className="font-bold my-1">Description : <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
            <h1 className="font-bold my-1">Experience : <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}</span></h1>
            <h1 className="font-bold my-1">Salary : <span className="pl-4 font-normal text-gray-800">{singleJob?.salary}</span></h1>
            <h1 className="font-bold my-1">Total Applicants : <span className="pl-4 font-normal text-gray-800">{singleJob?.applications.length}</span></h1>
            <h1 className="font-bold my-1">Posted date : <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>

        </div>
    </div>
  )
}

export default JobDescription
