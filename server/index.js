import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";


import { connectDB } from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
dotenv.config();
const app = express();

// middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// routes

app.get("/", (req, res) => {
  res.send("jdojasodjadj");
});

app.use("/api/v1/post",postRoutes)
app.use("/api/v1/dalle",dalleRoutes)


// db and port
const port = 8080;
const startServer = async () => {
  try {
   await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
