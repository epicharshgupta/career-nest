import axios from 'axios'
import { useEffect } from 'react'
import {Company_API_ENDPOINT} from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchSingleCompany= async () =>{
        try {
            const res=await axios.get(`${Company_API_ENDPOINT}/get/${companyId}`,{withCredentials:true});
            console.log(res.data.jobs)
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchSingleCompany();
  },[companyId,dispatch])
}

export default useGetCompanyById
