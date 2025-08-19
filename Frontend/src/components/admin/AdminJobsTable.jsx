import React, { useState,useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Edit2, MoreHorizontal ,Eye} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'



const AdminJobsTable = () => {
useGetAllAdminJobs();
  const navigate=useNavigate();
  const {companies,searchCompanyByText} = useSelector(store=>store.company)

  const {allAdminJobs,searchJobByText} = useSelector(store=>store.job)
//   console.log(allAdminJobs)
  const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  useEffect(() => {
        const filterJobs = allAdminJobs.length>0 && allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())||
            job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filterJobs)
  }, [allAdminJobs,searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>Recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
                {
                  filterJobs?.map((job) => 
                    (<tr>
                      
                      <TableCell>{job?.company?.name}</TableCell>
                      <TableCell>{job?.title}</TableCell>

                      <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="text-right cursor-pointer">
                        <Popover>
                          <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div onClick={()=>navigate(`/admin/companies/${job._id}`)}className='flex items-center gap-2 w-fit cursor-pointer'>
                              <Edit2 className='w-4' />
                              <span>Edit</span>
                            </div>
                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 mt-2 cursor-pointer'>
                                <Eye className='w-4'/>
                                <span>Applicants</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </tr>
                    )
                )
                }
              



        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
