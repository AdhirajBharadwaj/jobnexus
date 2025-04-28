import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { motion } from "framer-motion";

const JobsTemp = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });

        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        {jobs.length === 0 ? (
          <div>No jobs found</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {jobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job._id}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsTemp;
