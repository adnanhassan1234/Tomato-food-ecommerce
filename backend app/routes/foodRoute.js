const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createFood,
  getAllFoods,
  getFoodById,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const foodRouter = express.Router();

// Image storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), createFood);
foodRouter.get("/get-all-food", getAllFoods);
foodRouter.get("/get-single-food/:id", getFoodById);
foodRouter.put("/update-food/:id", upload.single("image"), updateFood); 
foodRouter.post("/delete-food/:id", deleteFood);

module.exports = foodRouter;
