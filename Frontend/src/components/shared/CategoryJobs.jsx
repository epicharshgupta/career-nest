import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { JobCategories } from '../../assets/assets'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../../redux/jobslice'


// const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Data Science",
//     "Graphic Designer",
//     "FullStack Developer",
// ]
const CategoryJobs = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=async(query)=>{
        dispatch(setSearchedQuery(query));
        navigate("/Browse")
    }
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-28'>
        <CarouselContent>
        {
            JobCategories.map((category,index) =>(
                <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                    <Button onClick={()=>searchJobHandler(category)} variant='outline' className='rounded-full bg-[#93acec]'>{category}</Button>
                </CarouselItem>
            )) 
        }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryJobs
