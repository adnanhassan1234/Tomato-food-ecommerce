const express = require("express");
const authMiddleware = require("../middleware/auth");
const { placeOrder, orderVerify, userOrder, listOrder, updateStatus } = require("../controllers/orderControllers");

const orderRouter = express.Router();

// order Routes
orderRouter.post("/place-order", authMiddleware, placeOrder);
orderRouter.post("/orderVerify", orderVerify);
orderRouter.post("/user-all-order", authMiddleware, userOrder);
orderRouter.get("/list-all-order", listOrder);
orderRouter.post("/status", updateStatus);

module.exports = orderRouter;
