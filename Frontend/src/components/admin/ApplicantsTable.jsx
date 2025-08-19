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
import { application_API_ENDPOINT } from '@/utils/constant'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,


} from "@/components/ui/popover"
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'

const shortlistngStatus = ["Accepted", "rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    console.log(applicants.data)
    console.log(applicants?.applications[0]?.profile?.resume)
    const statusHandler = async (status,id) => {
        try {
            axios.defaults.withCredentials=true;
            const res=await axios.post(`${application_API_ENDPOINT}/status/${id}/update`,{status})
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }
    return (
        <div>
            <Table>
                <TableCaption>Applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Conatct No.</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applicants && applicants.applications.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resumeOriginalName} target='_blank' rel="noonpener noreferrer">{item?.applicant?.profile?.resumeoriginalName}</a> :
                                            <span>No Resume</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='float-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortlistngStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={()=>statusHandler(status,item._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
