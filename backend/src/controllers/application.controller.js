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

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await prisma.job.findUnique({
      where: {
        id: Number(jobId),
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const applications = await prisma.application.findMany({
      where: {
        jobId: Number(jobId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected",
      });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        job: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.job.employerId !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updatedApplication =
      await prisma.application.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
        },
      });

    return res.status(200).json({
      message: "Application updated",
      application: updatedApplication,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyToJob,
  getJobApplications,
  updateApplicationStatus
};