const prisma = require("../config/prisma");

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }

    const job = await prisma.job.findUnique({
      where: { id: Number(jobId) },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: req.user.id,
          jobId: Number(jobId),
        },
      },
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "You already applied to this job",
      });
    }

    const application = await prisma.application.create({
      data: {
        userId: req.user.id,
        jobId: Number(jobId),
      },
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyToJob,
};