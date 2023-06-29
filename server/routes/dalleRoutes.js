import express from "express"
import * as dotenv from "dotenv"
import {Configuration,OpenAIApi} from "openai"
import Post from "../mongodb/models/post.js"

dotenv.config()

const apikey=process.env.OPENAI_API_KEY
console.log(apikey);

const dalleRoutes =express.Router()

const configuration=new Configuration({
    apiKey:apikey
})

const openai=new OpenAIApi(configuration)

dalleRoutes.route("/").get((req,res)=>{
    res.send("dalle")
    console.log();
})

dalleRoutes.route("/").post(async(req,res)=>{
    try {
        const {prompt}=req.body
        const aiRespone=await openai.createImage({
            prompt,
            n:1,
            size:"1024x1024",
            response_format:"b64_json"
        });

// console.log(aiRespone);
        const image=aiRespone.data.data[0].b64_json
        if(image){
            // console.log(image.);
            return res.status(200).json({photo:image})
        }
        return res.status(500).json({err:"sth went wrong"})



    } catch (error) {
        console.log(error);
        return res.status(500).send(error?.response.data.error.message)
    }
})

export default dalleRoutes;