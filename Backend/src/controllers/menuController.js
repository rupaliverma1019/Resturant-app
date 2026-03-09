import { Menu } from "../models/menuModel.js";
import {v2 as cloudinary} from "cloudinary"

export const addMenu = async (req, res) => {
  try {
    console.log("response " , res.body)
    const { name, description, price, category } = req.body;
console.log("response " , res.body)
    // ✅ Stop if any field missing
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({
        message: "Please enter all fields",
        success: false,
      });
    }
    // ✅ Upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // ✅ Create menu item
    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    return res.status(201).json({
      message: "Menu item added",
      success: true,
      menuItem: newMenuItem,
    });

  } catch (error) {
    console.log(error);   // 👈 Always log error for debugging
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// http://localhost:5000/api/menu/getAllMenuItems
export const getAllMenuItems = async( req , res) =>{
    try {
        const menuItems = await Menu.find().populate("category" , "name").sort({createdAt : -1})
        return res.status(400).json({
        success : true,
        menuItems
})
    } catch (error) {
                res.status(500).json({message : `Internal server Error`})
    }

}

export const updateMenuItems=async(req,res) =>
{
    try {
        const id = req.params
    const {name ,description , price , category , isAvailable} = req.body

    const menuItem = await Menu.findById(id)

    if(!menuItem)
    {
        return res.status(400).json({
            message : "Menu Items not faund",
            success : false
        })
    }
    if(req.file)
    {
        const result = await cloudinary.uploader.upload(req.file.path)
        menuItem.image = result.secure_url
    }
    if(name)
    {
        menuItem.name = name;
    }
    if(description)
    {
        menuItem.description = description;
    }
    if(price)
    {
        menuItem.price = price;

    }
    if(category)
    {
        menuItem.category = category
    }
    if(isAvailable!==undefined)
    {
        menuItem.isAvailable = isAvailable
    }
  await menuItem.save()
  res.status(200).json({
    message : "menu item updated",
    success : true,
    menuItem
  })
    } catch (error) {
         res.status(500).json({message : `Internal server Error`})
    }
    
}

export const deleteMenuItem = async(req , res) =>{
    try {
        const id = req.param
        const menuItem = await Menu.findByIdAndDelete(id)
        res.status(400).json({
        success : true,
        message : "menu item deleted"
    })
    } catch (error) {
         res.status(500).json({message : `Internal server Error`})
    }
  
}

