import React, { useContext, useEffect } from "react";
import "./verify.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { StoreContext } from "../../Context/StoreContext";

const Verify = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const { contextValue, theme } = useContext(StoreContext);
  const { setCartItems } = contextValue;

  const verifyPayment = async () => {
    try {
      const res = await axios.post(`${baseUrl}/order/orderVerify`, {
        success,
        orderId,
      });
      if (res.data.success) {
        toast.success("Payment successful and order placed!");
        // Clear cartItems from localStorage
        localStorage.removeItem("cart");
        setCartItems({});
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Error verifying payment");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId]);

  return (
    <div className={`verify ${theme}`}>
      <h2>Order Verification</h2>
      {success ? (
        <div className="message success-message">
          <div className="icon success-icon">✔</div>
          <p>Your order has been placed successfully!</p>
          <p>
            Order ID: <strong>{orderId}</strong>
          </p>
          <button className="navigate-button" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      ) : (
        <div className="message error-message">
          <div className="icon error-icon">✖</div>
          <p>There was an issue placing your order.</p>
          <p>Please try again or contact support.</p>
          <button className="navigate-button" onClick={() => navigate("/cart")}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Verify;
