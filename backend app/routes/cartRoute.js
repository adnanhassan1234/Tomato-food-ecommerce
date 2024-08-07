const express = require("express");
const {
  addToCart,
  removeFromCart,
  fetchUserCartData,
} = require("../controllers/cartControllers");
const authMiddleware = require("../middleware/auth");

const cartRouter = express.Router();

// user Routes
cartRouter.post("/add-cart", authMiddleware, addToCart);
cartRouter.post("/remove-cart", authMiddleware, removeFromCart);
cartRouter.get("/get-all-cart", authMiddleware, fetchUserCartData);

module.exports = cartRouter;
