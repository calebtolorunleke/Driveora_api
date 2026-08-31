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

// Configure CORS cleanly
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

// Root test route
app.get("/", (req, res) => {
  res.send("Driveora API is running...");
});

// Helper middleware to handle database connection per request safely
const ensureDbConnected = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
};

// Apply DB connection before routes
app.use("/api/user", ensureDbConnected, userRouter);
app.use("/api/owner", ensureDbConnected, ownerRouter);
app.use("/api/bookings", ensureDbConnected, bookingRouter);

export default app;
