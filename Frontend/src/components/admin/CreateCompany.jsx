import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Company_API_ENDPOINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
const CreateCompany = () => {
    const navigate=useNavigate();
    const [companyName,setCompanyName]=useState();    
    const dispatch=useDispatch();

    const registerNewCompany = async() =>{
        try {
            // console.log(company_API_ENDPOINT)
            console.log(companyName);
            console.log(Company_API_ENDPOINT)
            const res = await axios.post(`${Company_API_ENDPOINT}/register`, { name: companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            // console.log(res.data)
            if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                    toast.success(res.data.message);
                    const companyId=res?.data?.company?._id;
                    navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Company Name</h1>
                <p className='text-gray-500'>Edit your company name later also.</p>
            </div>
            <Label>Company name</Label>
            <Input
                className='my-2'
                type='text'
                placeholder='JobHunt, Ms etc..'
                onChange={(e) => {
                setCompanyName(e.target.value);
                // console.log("Updated value:", e.target.value);
            }}
            />
            
            <div className='flex items-center gap-2 my-10'>
                <Button variant='outline' onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                <Button onClick={registerNewCompany}>continue</Button>

            </div>
      </div>
    </div>
  )
}

export default CreateCompany
