import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/uesrRoutes.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoute.js";

const app = express();

const allowedOrigins = [
  "https://driveora.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Root endpoint for testing API status
app.get("/", (req, res) => {
  res.status(200).send("Driveora API is running...");
});

// Non-blocking database check wrapper
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

export default app;
