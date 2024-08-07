import React from "react";
import { assets } from "../../assets/admin_assets/assets";

const Transection = ({ orders, statusHandler, lenght }) => {
  return (
    <>
      <div
        className="lenth"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <p>List: {lenght}</p>
      </div>
      {orders.map((order, index) => (
        <div className="order-item" key={index}>
          <img src={assets.parcel_icon} alt="Parcel Icon" />
          <div className="order-details">
            <p className="order_item__food">
              {order.items.map((item, ind) => (
                <span key={ind}>
                  {item.name} X {item.quantity}
                  {ind < order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="order_item__name">
              {order.address.firstname} {order.address.lastname}
            </p>
            <div className="order_item__address">
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},
                {order.address.country}, {order.address.zip}
              </p>
            </div>
            <p className="order_item__phone">{order.address.phone}</p>
          </div>
          <div className="order-summary">
            <p>Items: {order.items.length}</p>
            <p>${order.amount.toFixed(2)}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </>
  );
};

export default Transection;
