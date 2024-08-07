const Food = require("../models/foodModels");
const fs = require("fs");

// Get all food items
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single food item by ID
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new food item
const createFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { name, description, price, category } = req.body;
  const food = new Food({
    name: name,
    description: description,
    price: price,
    image: image_filename,
    category: category,
  });

  try {
    const newFood = await food.save();
    res.status(201).json({ success: true, message: "Food added", newFood });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  const updateFields = {};

  if (req.file) {
    updateFields.image = req.file.filename;
  }

  if (name) updateFields.name = name;
  if (description) updateFields.description = description;
  if (price) updateFields.price = price;
  if (category) updateFields.category = category;

  try {
    let food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    food = await Food.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Food item updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Delete a food item by ID
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => {});

    await Food.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Food item  deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
