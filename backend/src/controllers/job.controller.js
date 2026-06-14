const prisma = require("../config/prisma");

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      jobType,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary,
        location,
        jobType,
        employerId: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
    getAllJobs,
};