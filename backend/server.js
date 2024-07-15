import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// Database Connection
connectDB()

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json()); // This will convert the JSON format when we get requests from frontend to backend
app.use(cors()); // Using this we can access backend from any frontend


// API Endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))

app.get("/", (req, res) => {
  res.send("API Working");
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
