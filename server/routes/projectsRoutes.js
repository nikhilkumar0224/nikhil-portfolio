import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "../controllers/projectsController.js";
import { uploadImage } from "../middleware/upload.js";
import { requireAdmin } from "../middleware/requireAdmin.js"; // NEW

const router = express.Router();

// Public: anyone can read projects
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin only: requireAdmin runs FIRST.
// On the upload route it sits before Multer, so an unauthorised request
// is rejected before any file is written to your disk.
router.post(
  "/upload",
  requireAdmin,
  uploadImage.single("image"),
  uploadProjectImage,
);
router.post("/", requireAdmin, createProject);
router.put("/:id", requireAdmin, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

export default router;
