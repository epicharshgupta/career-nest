import { useDispatch } from "react-redux"
import { application_API_ENDPOINT } from '@/utils/constant'
import axios from "axios";
import { useEffect } from "react";
import { setAllAppliedJobs } from "../redux/jobslice";


const useGetAppliedJobs=()=>{
    const dispatch=useDispatch();


    useEffect(() => {
        const fetchAppliedJobs=async() =>{
            try {
                const res=await axios.get(`${application_API_ENDPOINT}/get`,{withCredentials:true})
                // console.log(res.data)
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                toast.error(error.res.data.message);
                console.log(error)
            }
        }
        fetchAppliedJobs();
    }, [])
}

export default useGetAppliedJobs;