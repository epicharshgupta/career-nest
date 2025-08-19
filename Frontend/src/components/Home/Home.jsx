import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Hero from '../shared/Hero'
import CategoryJobs from '../shared/CategoryJobs'
import LatestJobs from '../shared/LatestJobs'
import Footer from '../shared/Footer'
import useGetAllJobs from '../../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  // useEffect(() => {
  //   if(user.role==="recruiter"){
  //       navigate('/admin/companies')
  //   }
  // }, [])
  return (
    <div>
      <Navbar/>
      <Hero/>
      <CategoryJobs/>
      <LatestJobs/>
      <Footer/>

    </div>
  )
}

export default Home
