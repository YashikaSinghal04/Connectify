import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.routes.js"
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://guileless-pixie-1032da.netlify.app"], // your actual Netlify URL
  credentials: true
}));

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
} catch (error) {
  console.log(error);
}

//routes

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../FRONTEND/dist")));
//   app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../FRONTEND/dist", "index.html"));
//   });
// }


server.listen(PORT, () => {
});
