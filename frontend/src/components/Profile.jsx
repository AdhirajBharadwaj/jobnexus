import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#f6f7fb] via-[#f9f6ff] to-[#fff6f2] pb-24">
            <Navbar />
            <div className="max-w-3xl mx-auto mt-10">
                <div className="bg-white/80 rounded-2xl shadow-lg p-10 flex flex-col items-center">
                    <Avatar className="h-28 w-28 mb-4 shadow-md">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                    </Avatar>
                    <h1 className="font-extrabold text-3xl text-gray-900 mb-1 text-center">{user?.fullname}</h1>
                    <p className="text-gray-600 text-center mb-4">{user?.profile?.bio}</p>
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="flex items-center gap-2 text-gray-500"><Mail className="w-5 h-5" /><span>{user?.email}</span></div>
                        <div className="flex items-center gap-2 text-gray-500"><Contact className="w-5 h-5" /><span>{user?.phoneNumber}</span></div>
                    </div>
                    <div className="w-full flex flex-col items-center mb-4">
                        <h2 className="font-semibold text-lg text-gray-800 mb-1">Skills</h2>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span className="text-gray-400">NA</span>}
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="mt-2" variant="outline"><Pen className="mr-2" />Edit Profile</Button>
                </div>
            </div>
            <div className="max-w-3xl mx-auto mt-8">
                <div className="bg-white/80 rounded-2xl shadow-lg p-8">
                    <h2 className="font-bold text-2xl text-gray-900 mb-5 text-center">Applied Jobs</h2>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile