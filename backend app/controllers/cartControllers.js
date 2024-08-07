const User = require("../models/userModels");

const addToCart = async (req, res) => {
  const userId = req.user.id; // Use authenticated user's ID
  const { itmId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};

    // Add or increment the item in the cart
    if (!cartData[itmId]) {
      cartData[itmId] = 1;
    } else {
      cartData[itmId] += 1;
    }

    // Update the user's cart data
    await User.findByIdAndUpdate(userId, { cartData });

    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
  const userId = req.user.id; // Use authenticated user's ID
  const { itmId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (cartData[itmId] > 0) {
      cartData[itmId] -= 1;
      if (cartData[itmId] === 0) {
        delete cartData[itmId];
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Item not found in the cart or already at zero quantity",
      });
    }

    // Update the user's cart data
    await User.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cartData,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Fetch user cart data
const fetchUserCartData = async (req, res) => {
  const userId = req.body.id; // Use authenticated user's ID

  try {
    const user = await User.findOne(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching user cart data:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  fetchUserCartData,
};
