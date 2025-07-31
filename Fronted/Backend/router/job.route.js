import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// POST: Create job
router.route("/post").post(isAuthenticated, postJob);

// GET: All jobs with optional keyword filtering
router.route("/get").get(isAuthenticated, getAllJobs);

// GET: Admin-created jobs
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// GET: Single job by ID
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
