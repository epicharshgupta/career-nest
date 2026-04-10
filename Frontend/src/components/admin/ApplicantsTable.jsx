import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { application_API_ENDPOINT } from '@/utils/constant';

const shortlistngStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    // ✅ Correct data path
    const applications = applicants?.job?.applications || [];

    console.log("Applicants:", applicants);
    console.log("Applications Array:", applications);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `${application_API_ENDPOINT}/status/${id}/update`,
                { status },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>Applicants</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No Applicants Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        applications.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>

                                <TableCell>{item?.applicant?.email}</TableCell>

                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600"
                                        >
                                            View Resume
                                        </a>
                                    ) : (
                                        "No Resume"
                                    )}
                                </TableCell>

                                <TableCell>
                                    {item?.createdAt
                                        ? item.createdAt.split("T")[0]
                                        : "N/A"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32">
                                            {shortlistngStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        statusHandler(status, item._id)
                                                    }
                                                    className="cursor-pointer my-2"
                                                >
                                                    {status}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;