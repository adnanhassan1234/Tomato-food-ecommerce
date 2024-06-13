import { useLocation } from "react-router-dom";
import "./placeorder.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const location = useLocation();
  const { theme } = useContext(StoreContext);
  const { subtotal, deliveryFee, total } = location.state;
  

  return (
    <div className="place_order">
      <form className={`order_details__box ${theme}`}>
        <div className="place_order__left">
          <p className="title">Delivery Information</p> <br />
          <div className="multi_fields">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
          <div className="multi_fields">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className="multi_fields">
            <input type="text" placeholder="Zip code" />
            <input type="text" placeholder="Country" />
          </div>
          <input type="text" placeholder="Phone" />
        </div>
        <div className="place_order__right">
          <div className="cart_total">
            <h2>Cart Totals</h2>
            <div className="cart_total__counts">
              <div className="cart_total__details">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <hr />
              <div className="cart_total__details">
                <p>Delivery Fee</p>
                <p>${deliveryFee}</p>
              </div>
              <div className="cart_total__details">
                <b>Total</b>
                <b>${total}</b>
              </div>
            </div>
            <button className="checkout_btn">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
