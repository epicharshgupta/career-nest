import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../redux/jobslice'


const filterData=[
    {
        filterType:"Location",
        array:["Delhi","Pune","Bangalore","Mumbai","Hyderabad","Noida"]
    },
    {
        filterType:"Category",
        array:["Frontend Developer","Backend Developer","Fullstack Developer","Data Scientist","Graphic Designer","Ui/Ux designer"]
    },
    {
        filterType:"Salary",
        array:["10-40k","40-60k","60-80k","80k-1lakh","1lakh-2lakh","2lakh and above"]
    }
]
const FilterCard = () => {
    const [selectedValue,setSelectedValue] = useState('');
    const dispatch=useDispatch();
    const changeHandler=(value) =>{
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])  
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
            filterData.map((data,index) =>(
                <div>
                    <h1 className='font-bold text-lg '>{data.filterType}</h1>
                    {
                        data.array.map((item,idx)=>{
                            const itemId=`r${index}-${idx}`
                            return (
                                <div className='flex items-center space-x-2 my-2'> 
                                    <RadioGroupItem value={item} id={itemId}/>
                                    <Label htmlfor={itemId}>{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
