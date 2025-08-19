import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import CompaniesTable from './CompaniesTable'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [input,setInput]=useState("");
  useEffect(() => {
     dispatch(setSearchCompanyByText(input))
  }, [input])
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-18'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="Filter by name"
                    onChange={(e)=>setInput(e.target.value)}
                />
                <Button onClick={()=>navigate('/admin/companies/create')}>New Company</Button>
            </div>
            <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
