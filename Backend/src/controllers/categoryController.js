import { Category } from "../models/categoryModel";
import {v2 as cloudinary} from "cloudinary"

export const addCategory = async(req,res) =>{
    try {
       const {name} =  req.body
       if(!name || !req.file)
       {
        return res.status(401).json({
            message : "Please enter Input feild",
            success : false
        })
       }
       const alreadyExist =  await Category.findOne({name})
       if(alreadyExist)
       {
        return res.status(400).json(
            {
                message:"User already exist",

            }
        )
       }
       const result = await cloudinary.uploader.upload(req.file.path)
       const newCategory = await Category.create({
        name,
        image : result.secure_url
       })
       res.status(201).json({
        message : "category added",
        success : true,
        category : newCategory
       })

    } catch (error) {
        console.log(error.message);       
        return res.status(401).json({message : `Internal Server Error`  , success : true})
    }
}