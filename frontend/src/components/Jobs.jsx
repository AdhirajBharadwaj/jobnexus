import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (
      searchedQuery &&
      typeof searchedQuery === 'object' &&
      Object.values(searchedQuery).every(val => !val)
    ) {
      setFilterJobs(allJobs);
    } else if (searchedQuery && typeof searchedQuery === 'object') {
      if (searchedQuery.keyword && searchedQuery.keyword.trim() !== '') {
        const kw = searchedQuery.keyword.toLowerCase();
        const filtered = allJobs.filter((job) => (
          (job.title && job.title.toLowerCase().includes(kw)) ||
          (job.description && job.description.toLowerCase().includes(kw)) ||
          (job.location && job.location.toLowerCase().includes(kw))
        ));
        setFilterJobs(filtered);
      } else {
        const filtered = allJobs.filter((job) => {
          let matches = true;
          if (searchedQuery.Location && job.location && job.location.toLowerCase().trim() !== searchedQuery.Location.toLowerCase().trim()) matches = false;
          if (searchedQuery.Industry && job.industry && job.industry.toLowerCase().trim() !== searchedQuery.Industry.toLowerCase().trim()) matches = false;
          if (searchedQuery.Salary && searchedQuery.Salary !== "") {
            const salary = Number(job.salary);
            if (searchedQuery.Salary === "0-40k" && !(salary >= 0 && salary <= 0.4)) matches = false;
            else if (searchedQuery.Salary === "42k-1lakh" && !(salary > 0.4 && salary <= 1)) matches = false;
            else if (searchedQuery.Salary === "1lakh to 5lakh" && !(salary > 1 && salary <= 5)) matches = false;
          }
          return matches;
        });
        setFilterJobs(filtered);
      }
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="pb-24 min-h-screen bg-gradient-to-br from-[#f7f7fa] via-[#f9f6ff] to-[#fff6f2]">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex gap-8">
          <div className="w-[22%] min-w-[220px]">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 py-6 px-4">
              <FilterCard />
            </div>
          </div>
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="flex items-center justify-center h-full text-xl text-gray-400 font-semibold">Job not found</div>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterJobs.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
