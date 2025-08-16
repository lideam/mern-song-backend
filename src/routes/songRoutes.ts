import express from "express";
import {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
  getStats,
} from "../controllers/songController";

const router = express.Router();

router.post("/", createSong);
router.get("/", getSongs);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);
router.get("/stats/data", getStats);

export default router;
