import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";
import { getAllPosts, postToCloudinary } from "../controlles/post.js";

dotenv.config();

const postRoutes = express.Router();



// get alll posts
postRoutes.route("/").get(getAllPosts);

postRoutes.route("/").post(postToCloudinary);

postRoutes.route;

export default postRoutes;
