import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from "@/components/ui/avatar"


const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector(store => store.job)
  return (
    <div>
      <Table>
        <TableCaption>Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>

            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You have not apllied nay job yet.</span> : allAppliedJobs.map((appliedjob) => (
              <TableRow key={appliedjob._id}>
                <TableCell>{appliedjob.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedjob?.job?.title}</TableCell>
                <div className='flex items-center'>
                  <TableCell>
                    <Avatar className='h-5 w-5'>
                      <AvatarImage src={appliedjob?.job?.company?.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell className='text-[18]'>{appliedjob?.job?.company?.name}</TableCell>


                </div>
                <TableCell className='text-right'><Badge className={`${appliedjob?.status==="rejected"?'bg-red-400':appliedjob.status==="pending"?'bg-gray-400':'bg-green-400'}`}>{appliedjob.status.toUpperCase()}</Badge></TableCell>

              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobs
