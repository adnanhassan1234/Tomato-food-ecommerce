import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./myorder.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrder = () => {
  const { theme, contextValue } = useContext(StoreContext);

  const { token, baseUrl } = contextValue;
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/order/user-all-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data?.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className={`${theme} my-order`}>
      <h2>My Orders</h2> <br />
      <div className="container">
        {data.map((order, index) => {
          return (
            <div className="my_order_orders" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((content, ind) => {
                  if (ind === order.items.length - 1) {
                    return content.name + " X " + content.quantity;
                  } else {
                    return content.name + " X " + content.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount.toFixed(2)}</p>
              <p>Items {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
                <button onClick={fetchOrder}>Track Order</button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
