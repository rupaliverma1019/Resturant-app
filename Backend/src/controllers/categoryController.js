import { Category } from "../models/categoryModel.js";
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

export const getAllCategory = async(req,res)=>{
    try {
       const categories =  await Category.find().sort({createdAt:-1})
       res.status(200).json({success : true , categories})
    } catch (error) {
        res.status(500).json({message : `Internal server Error`})
    }
}

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false
      });
    }

    // update image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.image = result.secure_url;
    }

    // update name if provided
    if (name) {
      category.name = name;
    }

    await category.save();

    return res.status(200).json({
      message: "Category updated",
      success: true,
      category
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const deleteCategory = async(req , res)=>{
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id)
        if(!category)
        {
            return res.json({
                message : `category not found`
            })
        }
        res.status(400).json({
            success : true,
            message:`category Deleted`
        })
    } catch (error) {
        res.json({
            message:`internal server error`,
            success : false
        })
    }
}
