import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      industry,
      location,
      jobType,
      experience,
      link,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !industry ||
      !location ||
      !jobType ||
      !link ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      industry,
      location,
      jobType,
      link,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { keyword = "", Location, Industry, Salary } = req.query;
    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    };
    if (Location) query.$and.push({ location: Location });
    if (Industry) query.$and.push({ industry: Industry });
    if (Salary) {
      const [min, max] = Salary.split("-").map(Number);
      query.$and.push({ salary: { $gte: min, $lte: max } });
    }
    const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });
    return res.status(200).json({ jobs: jobs || [], success: true });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    return res.status(500).json({ message: "Error fetching jobs", success: false });
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export  const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    return res.status(200).json({
      job: updatedJob,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};