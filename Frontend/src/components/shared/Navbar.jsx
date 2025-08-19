import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {User2,LogOut} from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import {REACT_APP_USER_API_ENDPOINT} from '../../utils/constant.jsx'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import { assets } from '../../assets/assets.js'




const Navbar = () => {
    // const user =false;
    const {user} = useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler= async() =>{
        try {
            const res=await axios.get(`${REACT_APP_USER_API_ENDPOINT}/logout`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message)
            
        }
    }
  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
            <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
            {
                user && user.role==="recruiter"?(
                    <>
                        <li><Link to="/admin/companies">Companies</Link></li>
                        <li><Link to="/admin/jobs">Jobs</Link></li>
                    </>
                ):(
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </>
                )
            }
                
            </ul>
            {
                !user ? (
                    <div className='flex items-center gap-2 '>
                        <Link to='/Login'><Button variant="outline">Login</Button></Link>
                        <Link to='/Signup'><Button className='bg-[#6A38C2] hover:bg-[#291358]'>Signup</Button></Link>
                    </div>):
                    (
                        <Popover>
                <PopoverTrigger asChild>
                    <Avatar className='cursor-pointer'>
                            <AvatarImage src={assets.profile_img} alt="@shadcn" />
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-80'>
                     <div className='flex gap-4 '>
                        <Avatar className='cursor-pointer'>
                                <AvatarImage src={assets.profile_img} alt="@shadcn" />
                        </Avatar>
                        <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <div className='flex flex-col text-gray-600'>
                    {
                        user && user.role==="student" && (
                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                            <User2/>
                            <Button variant="link"><Link to="/view-profile">view Profile</Link></Button>
                        </div>
                        )
                    }
                        
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                <LogOut/>
                                <Button onClick={logoutHandler} variant="link">Log out</Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
                    )
                
            }
            
        </div>
        </div>
    </div>
  )
}


export default Navbar
