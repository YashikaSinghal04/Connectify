import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.routes.js"
import { app, server } from "./SocketIO/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("Error: MONGODB_URI is not defined. Please check your .env file.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);









if(process.env.NODE_ENV !=="production"){
const PORT = process.env.PORT || 4002;
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
}
// Export server for vercel
export default index

