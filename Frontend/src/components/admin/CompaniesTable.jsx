import React, { useState, useEffect } from 'react';
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

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  useGetAllCompanies();
  const navigate = useNavigate();

  // Redux se data
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  );

  // Always array initialize
  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    // Safe filtering
    const filtered = companies?.filter((company) => {
      if (!searchCompanyByText) return true;

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    }) || [];

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>Recent registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(filterCompany || []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Companies Found
              </TableCell>
            </TableRow>
          ) : (
            (filterCompany || []).map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>

                <TableCell>{company?.name}</TableCell>

                <TableCell>
                  {company?.createdAt
                    ? company.createdAt.split("T")[0]
                    : "N/A"}
                </TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
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

export default CompaniesTable;