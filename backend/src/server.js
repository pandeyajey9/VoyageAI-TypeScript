import dotenv from "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

// dotenv.config();
console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "FOUND" : "NOT FOUND");
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
