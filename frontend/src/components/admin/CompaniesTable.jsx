import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCompanies } from '@/redux/companySlice'

const CompaniesTable = () => {
    useGetAllCompanies(); 
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this company?')) return;
        setDeletingId(id);
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/company/delete/${id}`, { withCredentials: true });
            if (res.data.success) {
                window.location.reload();
            } else {
                alert(res.data.message || 'Failed to delete company');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const updatedCompanies = companies.filter(company => company._id !== id);
                dispatch(setCompanies(updatedCompanies));
                alert('Company not found in database. Removed from list.');
            } else {
                alert('Error deleting company');
            }
        } finally {
            setDeletingId(null);
        }
    }
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div
                                                className={`flex items-center gap-2 w-fit cursor-pointer text-red-600 mt-2 ${deletingId === company._id ? 'opacity-50 pointer-events-none' : ''}`}
                                                onClick={() => handleDelete(company._id)}
                                            >
                                                <span>{deletingId === company._id ? 'Deleting...' : 'Delete'}</span>
                                            </div>
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

export default CompaniesTable