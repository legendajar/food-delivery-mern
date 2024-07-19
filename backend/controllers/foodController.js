import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs"; // importing inbuilt file system

// add food item
const addFood = async (req, res) => {
  let img_filename = `${req.file.filename}`;

  const newFood = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: img_filename,
    category: req.body.category,
  });

  try {
    await newFood.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};


// get all food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.json({ success: false, message: "Food Not Found" });
    } else {
        return res.json({ success: true, data: foods });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
    try {
        const id = req.body.id;
        const food = await foodModel.findById(id);
        if(!food) {
            return res.json({
                success: false,
                message: "Food Not Found"
            })
        } else {
            fs.unlink(`uploads/${food.image}`, () => {});
            await foodModel.findByIdAndDelete(id);
            return res.json({ success: true, message: "Food Removed" });
        }
    } catch (error) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
