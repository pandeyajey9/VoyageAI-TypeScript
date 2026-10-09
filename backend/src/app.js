import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js"
import aiRoutes from "./routes/aiRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("VoyageAI Backend Running...");
});
export default app;
