import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const JobSetup = () => {
    const params = useParams();
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        industry: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ''
    });
    const { companies } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            if (params.id) {
                try {
                    const res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, { withCredentials: true });
                    if (res.data.success) {
                        const job = res.data.job;
                        setInput({
                            title: job.title || '',
                            description: job.description || '',
                            requirements: job.requirements || '',
                            salary: job.salary || '',
                            industry: job.industry || '',
                            location: job.location || '',
                            jobType: job.jobType || '',
                            experience: job.experience || '',
                            position: job.position || 0,
                            companyId: job.company?._id || ''
                        });
                    }
                } catch (error) {
                    toast.error('Failed to fetch job details.');
                }
            }
        };
        fetchJob();
    }, [params.id]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id || '' });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res;
            if (params.id) {
                // Edit mode
                res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, { withCredentials: true });
            } else {
                // Create mode
                res = await axios.post(`${JOB_API_END_POINT}/post`, input, { withCredentials: true });
            }
            if (res.data.success) {
                toast.success(params.id ? 'Job updated successfully!' : 'Job created successfully!');
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error('Failed to submit job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
                <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <h2 className="text-2xl font-bold mb-6">{params.id ? 'Edit Job' : 'Create Job'}</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input name="title" value={input.title} onChange={changeEventHandler} required />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input name="description" value={input.description} onChange={changeEventHandler} required />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input name="salary" value={input.salary} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Industry</Label>
                        <Input name="industry" value={input.industry} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input name="location" value={input.location} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Application Link</Label>
                        <Input name="link" value={input.link} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Experience</Label>
                        <Input name="experience" value={input.experience} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Position</Label>
                        <Input name="position" type="number" value={input.position} onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Company</Label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            name="companyId"
                            value={input.companyId}
                            onChange={e => setInput({ ...input, companyId: e.target.value })}
                            required
                        >
                            <option value="">Select Company</option>
                            {companies?.map(company => (
                                <option key={company._id} value={company._id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? <Loader2 className="animate-spin" /> : params.id ? 'Update Job' : 'Create Job'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default JobSetup;
