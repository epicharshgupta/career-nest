import axios from 'axios'
import { useEffect } from 'react'
import {job_API_ENDPOINT} from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobslice'

const useGetAllJobs = () => {
    const dispatch=useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
  useEffect(()=>{
    const fetchAllJobs= async () =>{
        try {
            const res=await axios.get(`${job_API_ENDPOINT}/get?keyword=${searchedQuery}`);
            // console.log(res.data.jobs)
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllJobs();
  },[searchedQuery])
}

export default useGetAllJobs
