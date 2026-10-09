import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  generateTripItinerary,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/", authMiddleware, createTrip);
router.get("/", authMiddleware, getAllTrips);
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);
router.post("/:id/generate", authMiddleware, generateTripItinerary);
export default router;
