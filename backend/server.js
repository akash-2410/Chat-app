import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import {app, server} from "./socket/socket.js";

dotenv.config();

const __dirname=path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env 
// variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

// to extract the fields from body
// to parse the incoming requests with JSON payloads(from req.body)
app.use(express.json());
app.use(cookieParser());

// Use the router for authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});

// app.get("/",(req,res)=>{
//   root route http://localhost:5000/
//   res.send("Hello World!!");
// });

// Start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
