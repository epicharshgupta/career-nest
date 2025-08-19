import React, { useState} from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {REACT_APP_USER_API_ENDPOINT} from '../../utils/constant.jsx'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice.js'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const {loading} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input,setInput] = useState({
    email:"",
    password:"",
    role:"",
  });

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    
      try {
          dispatch(setLoading(true));
          const response=await axios.post(`${REACT_APP_USER_API_ENDPOINT}/login`,input,{
            headers:{
              "Content-Type":"application/json",
            },
            withCredentials:true,
          })    
          if(response.data.success){
            dispatch(setUser(response.data.user))
            navigate('/')
            toast.success(response.data.message)
          }    
      } catch (error) {
        console.log(error);
        
      } finally{
        dispatch(setLoading(false));
      }
   }
    return (
      <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
          <form onSubmit={(e)=>submitHandler(e)} className='w-1/2 border border-gray-200 rounded-md p-4 my-10' >
              <h1 className='font-bold text-center text-xl mb-5'>Log in</h1>
              
              <div className='my-2'>
                  <Label>E-mail</Label>
                  <Input type='email' placeholder='....@gmail.com' value={input.email}
                  name="email" onChange={changeEventHandler}/>
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
                        
              </div>
              {
                loading?<Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>:
                <Button type='submit' className='w-full my-4'>Login</Button>

              }
              <span className='text-sm'> Don't have an account? <Link to='/Signup' className='text-blue-600'>Signup</Link></span>
          </form>
        </div>
      </div>
  )
}

export default Login
