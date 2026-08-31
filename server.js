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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Respond 200 to all OPTIONS preflight requests immediately
app.options("*", cors());

app.use(express.json());

// Lazy-connect DB middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ success: false, message: "Database connection failure" });
  }
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

export default app;
