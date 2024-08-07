import { useLocation, useNavigate } from "react-router-dom";
import "./placeorder.css";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const PlaceOrder = ({ setShowLogin }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const { contextValue, theme } = useContext(StoreContext);
  const { subtotal, deliveryFee, total } = location.state;
  const { token, food_list, cartItems, userId } = contextValue;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itenInfo = item;
        itenInfo["quantity"] = cartItems[item._id];
        orderItems.push(itenInfo);
      }
    });

    let orderData = {
      address: formData,
      items: orderItems,
      amount: total.toFixed(2),
      userId: userId,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/order/place-order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl);
      }

      console.log("Payment successful:", response.data);
      // toast.success("Payment successful and order placed!");
    } catch (error) {
      console.error("Error processing payment:", error);
      if (error.response?.status === 401) {
        setShowLogin(true);
      }
      toast.error(
        error.response.data.message || "Payment failed. Please try again."
      );
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (subtotal === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div className="place_order">
      <form className={`order_details__box ${theme}`} onSubmit={handlePayment}>
        <div className="place_order__left">
          <p className="title">Delivery Information</p> <br />
          <div className="multi_fields">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <div className="multi_fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="multi_fields">
            <input
              type="text"
              name="zip"
              placeholder="Zip code"
              value={formData.zip}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="place_order__right">
          <div className="cart_total">
            <h2>Cart Totals</h2>
            <div className="cart_total__counts">
              <div className="cart_total__details">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart_total__details">
                <p>Delivery Fee</p>
                <p>${deliveryFee}</p>
              </div>
              <div className="cart_total__details">
                <b>Total</b>
                <b>${total.toFixed(2)}</b>
              </div>
            </div>
            <button type="submit" className="checkout_btn">
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
