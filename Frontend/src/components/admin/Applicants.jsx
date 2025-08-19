import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { application_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'

const Applicants = () => {
    const params=useParams();
    const dispatch=useDispatch();
    const {applicants} =useSelector(store=>store.application)
    // console.log(applicants)
    useEffect(() => {
        const fetchAllApplicants=async() =>{
            try {
                const res=await axios.get(`${application_API_ENDPOINT}/${params.id}/applicants`,{withCredentials:true})
                // console.log(res.data)
                dispatch(setAllApplicants(res.data.job))
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants();
    }, [])
  return (
    <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl m-5'>Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable/>
            </div>
    </div>
  )
}

export default Applicants
