import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudKey = process.env.CLOUDINARY_CLOUD_API_KEY;
const cloudSecret = process.env.CLOUDINARY_CLOUD_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
});

// save to cloudinary

export const postToCloudinary = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log(photoUrl);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });
    if (newPost) return res.status(200).json({ success: true, data: newPost });
    return res.status(500).json({ success: false, message: "sth went wrong" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};

// get all post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts) return res.status(200).json({ success: false, data: posts });
    return res.status(500).json({ success: false, message: "sth went wrong" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};
