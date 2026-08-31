// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on("connected", () =>
//       console.log("Database Connected"),
//     );
//     await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

// Global cache variable across serverless warm starts
let isConnected = false;

const connectDB = async () => {
  // Return early if connection is already active
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing.");
  }

  try {
    // If database name isn't specified in connection string, provide dbName option cleanly
    const db = await mongoose.connect(uri, {
      dbName: "car-rental",
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error; // Re-throw so Express catch blocks catch server errors properly
  }
};

export default connectDB;
