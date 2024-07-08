import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        image:image_filename,
        price:req.body.price,
        category:req.body.category
    })
    try{
        await food.save();
        res.status(201).json({success:true,message:"Food Added successfully"});
    }
    catch(error){
        console.log(error)
        res.status(400).json({success:false,message:"Error while adding "});
    }
}
// all food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods});
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error while getting food list"});
    }
}


// remove food item
 const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);

        fs.unlinkSync(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food removed successfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error while removing food"});
    }
}
export {addFood,listFood,removeFood}