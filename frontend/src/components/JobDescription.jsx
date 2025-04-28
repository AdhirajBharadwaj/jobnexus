import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [jobLink, setJobLink] = useState("");

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            if(res.data.success){
                setIsApplied(true); 
                setJobLink(res.data.link); 
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-[#f7f8fa] py-10">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow p-8 mb-10 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-1">{singleJob?.title}</h1>
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <Badge className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-1 text-sm font-medium">{singleJob?.postion} Positions</Badge>
                                <Badge className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-1 text-sm font-medium">{singleJob?.jobType}</Badge>
                                <Badge className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-1 text-sm font-medium">{singleJob?.salary} LPA</Badge>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-gray-700 text-base">
                                <div><span className="font-medium">Role:</span> <span className="ml-2 text-gray-900">{singleJob?.title}</span></div>
                                <div><span className="font-medium">Location:</span> <span className="ml-2 text-gray-900">{singleJob?.location}</span></div>
                                <div><span className="font-medium">Experience:</span> <span className="ml-2 text-gray-900">{singleJob?.experience} yrs</span></div>
                                <div><span className="font-medium">Salary:</span> <span className="ml-2 text-gray-900">{singleJob?.salary} LPA</span></div>
                                <div><span className="font-medium">Total Applicants:</span> <span className="ml-2 text-gray-900">{singleJob?.applications?.length}</span></div>
                                <div><span className="font-medium">Posted Date:</span> <span className="ml-2 text-gray-900">{singleJob?.createdAt.split("T")[0]}</span></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-md px-7 py-2 text-base font-semibold shadow-sm border border-[#7209b7] bg-white text-[#7209b7] hover:bg-[#7209b7] hover:text-white transition-all duration-200 ${isApplied ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed hover:bg-gray-200 hover:text-gray-400' : ''}`}
                            >
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                            {isApplied && singleJob?.link && (
                                <Button
                                    onClick={() => window.open(singleJob.link, '_blank')}
                                    className="rounded-md px-7 py-2 text-base font-semibold shadow-sm border border-[#009688] bg-white text-[#009688] hover:bg-[#009688] hover:text-white transition-all duration-200 mt-2"
                                >
                                    Job Link
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Job Description</h2>
                    <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line" style={{minHeight:'100px'}}>{singleJob?.description}</p>
                </section>
            </div>
        </div>
    )
}

export default JobDescription