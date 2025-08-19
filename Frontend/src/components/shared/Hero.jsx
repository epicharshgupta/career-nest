import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobslice'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [query,setQuery] = useState("")
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=async()=>{
      dispatch(setSearchedQuery(query));
      navigate("/Browse")
  }
  return (
    <div className='text-center bg-[#a275ef] px-4 py-2 rounded-2xl mx-24'>
        <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>No. 1 job Hunt website</span>
            <h1 className='text-4xl font-bold'>Search,Apply & <br/> Get Your <span className='text-[#35166c]'> Dream Jobs</span></h1>
            <p className='  font-medium'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!      </p>
            <div className='flex w-[40%] shadow-lg border bg-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input type="text"
                placeholder='find your dream job'
                className='outline-none border-none w-full bg-inherit'
                onChange={(e)=>setQuery(e.target.value)}
                />
                <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
                    <Search className='h-5 w-5'/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Hero
