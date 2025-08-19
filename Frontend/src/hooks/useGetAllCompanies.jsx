import axios from 'axios'
import { useEffect } from 'react'
import {Company_API_ENDPOINT} from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../redux/companySlice'

const useGetAllCompanies = () => {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchCompanies= async () =>{
        try {
            const res=await axios.get(`${Company_API_ENDPOINT}/get`,{withCredentials:true});
            // console.log(res.data.companies)
            if(res.data.success){
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchCompanies();
  },[dispatch])
}

export default useGetAllCompanies 
