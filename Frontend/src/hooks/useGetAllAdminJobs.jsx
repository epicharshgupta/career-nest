import axios from 'axios'
import { useEffect } from 'react'
import {job_API_ENDPOINT} from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobslice'

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs= async () =>{
        try {
            const res=await axios.get(`${job_API_ENDPOINT}/getadminjobs`,{withCredentials:true});
            // console.log(res)
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllAdminJobs();
  },[])
}

export default useGetAllAdminJobs
