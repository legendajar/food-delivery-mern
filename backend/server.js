import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

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
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
