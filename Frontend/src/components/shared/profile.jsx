import React, { useState ,useEffect} from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { assets } from '../../assets/assets'
import { Badge } from "@/components/ui/badge"
import {  Contact, Mail, Pen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import AppliedJobs from './appliedJobs'
import UpdateProfile from './updateProfile'
import useGetAppliedJobs from '../../hooks/usegetAppliedJobs'
// import { setUser } from '../../redux/authSlice'


// const skills=["html","css","react","java","php","dsa"]
const Profile = () => {
    useGetAppliedJobs();
    const isResume=true;
    const [open,setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)
    
    // const {setUser} = useSelector(store=>store.auth)
    useEffect(() => {
        console.log(user?.fullname)
    
    console.log(user?.profile?.profilePhoto)
    }, [user])

  return (
    <div>
        <Navbar/>
        <div className='max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-10'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={assets.profile_img} alt="" /> 
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} className='text-right' variant='outline'><Pen/></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact/>
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-4 my-5'>
                    {
                        user?.profile?.skills.length!==0?user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>) :<span>Not Applicable</span>
                    }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold '>Resume</Label>
                    {
                        isResume ? <a target='_blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>:
                        <span>Not Applicable</span>
                    }
                </div>
                <div className='max-w-5xl mx-auto bg-white rounded-2xl'>
                        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                        <AppliedJobs/>
                </div>
                <UpdateProfile open={open} setOpen={setOpen}/>
        </div>
    </div>
  )
}

export default Profile
