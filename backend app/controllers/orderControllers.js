const Stripe = require("stripe");
const orderModel = require("../models/orderModels");
const userModel = require("../models/userModels");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontendUrl = "http://localhost:5173";

// Placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Create the order in the database
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });

    await newOrder.save();
    // Clear the user's cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare line items for Stripe Checkout session
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?cancel=true&orderId=${newOrder._id}`,
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
      message: "Payment successful and order placed",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};

const orderVerify = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === true) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (error) {
    console.log("error:", error);
    res.json({
      success: false,
      message: "error",
      error,
    });
  }
};

// all order when order placed
const userOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await orderModel.find({ userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};
// Fetch all orders for a admin frontnd
const listOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};
// api update staus
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const orders = await orderModel.findByIdAndUpdate(orderId, {
      status: status,
    });
    res.status(200).json({
      success: true,
      message:"Order updated"
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to order updated",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  orderVerify,
  userOrder,
  listOrder,
  updateStatus,
};
