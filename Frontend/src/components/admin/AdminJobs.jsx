import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import CompaniesTable from './CompaniesTable'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobslice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [input,setInput]=useState("");
  useEffect(() => {
     dispatch(setSearchJobByText(input))
  }, [input])
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-18'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="Filter by Company name,role"
                    onChange={(e)=>setInput(e.target.value)}
                />
                <Button onClick={()=>navigate('/admin/jobs/post')}>Post New Job</Button>
            </div>
            <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs
