import React,{useState} from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice.js'
import { Loader2 } from 'lucide-react'

import {REACT_APP_USER_API_ENDPOINT} from '../../utils/constant.jsx'
// import dotenv from 'dotenv'
// dotenv.config();



const Signup = () => {
  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch();

  const [input,setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const changeFileHandler = (e) => {
    setInput({...input,file:e.target.files?.[0]})
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
    if(input.file){
      formData.append("file",input.file)
    }

      try {
          dispatch(setLoading(true));
        
        // console.log(fullname)
        //   console.log(USER_API_ENDPOINT)
          const response=await axios.post(`${REACT_APP_USER_API_ENDPOINT}/register`,formData,{
            headers:{
              "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
          })    
          console.log(response)
          if(response.data.success){
            navigate('/login');
            toast.success(response.data.message)
          }    
      } catch (error) {
        console.log(error);
        
      } 
      finally{
              dispatch(setLoading(false));
       }
   }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={(e)=>submitHandler(e)} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-center text-xl mb-5'>Sign Up</h1>
            <div className='my-2'>
                <Label>Full name</Label>
                <Input type='text' placeholder='your name' value={input.fullname}
                  name="fullname" onChange={changeEventHandler}
                />
            </div>
            <div className='my-2'>
                <Label>E-mail</Label>
                <Input type='email' placeholder='....@gmail.com' value={input.email}
                  name="email" onChange={changeEventHandler}/>
            </div>
            <div className='my-2'>
                <Label>phone Number</Label>
                <Input type="text" placeholder='0000000000' value={input.phoneNumber}
                  name="phoneNumber" onChange={changeEventHandler}/>
            </div>
            <div className='my-2'>
                <Label>Password</Label>
                <Input type='password' placeholder='#######' value={input.password}
                  name="password" onChange={changeEventHandler}/>
            </div>
            <div className='flex items-center justify-between'>
                      <RadioGroup className='flex items-center gap-4 my-5'>
               
                        <div className="flex items-center space-x-2">
                        <Input type='radio' name='role' value='student' className='cursor-pointer'
                          checked={input.role==='student'} onChange={changeEventHandler}
                        />
                        <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Input type='radio' name='role' value='recruiter' className='cursor-pointer'
                          checked={input.role==='recruiter'} onChange={changeEventHandler}
                        />
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                      </RadioGroup>
                      <div className='flex items-center gap-2'>
                      <Label>Profile</Label>
                      <Input accept='image/' type='file' className='cursor-pointer'
                        onChange={changeFileHandler} 
                      />

                      </div>
            </div>
            {
                loading?<Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>:
                <Button type='submit' className='w-full my-4'>Sign up</Button>

              }            <span className='text-sm'> Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}
export default Signup
