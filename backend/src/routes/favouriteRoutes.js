import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../controllers/favouriteController.js";

const router = express.Router();
router.post("/", authMiddleware, addFavourite);
router.get("/", authMiddleware, getFavourites);
router.delete("/:destinationId", authMiddleware, removeFavourite);

export default router;
