import { useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const navigate = useNavigate();
  const { contextValue, theme } = useContext(StoreContext);
  const { food_list, isLoading, cartItems, RemoveFromCart } = contextValue;

  const calculateSubtotal = () => {
    return food_list.reduce((acc, item) => {
      const itemQuantity = cartItems[item._id] || 0;
      return acc + item.price * itemQuantity;
    }, 0);
  };

  const deliveryFee = 5;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <br />
          <h3>Loading cart items...</h3>
        </div>
      ) : (
        <>
          {Object.keys(cartItems).length > 0 ? (
            <div className={`cart ${theme}`}>
              <div className={`cart_item ${theme}`}>
                <div className={`cart_item__header ${theme}`}>
                  <p>Item</p>
                  <p>Title</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total</p>
                  <p>Remove</p>
                </div>
                <hr />
                {food_list.map((content) => {
                  if (cartItems[content._id] > 0) {
                    return (
                      <div key={content._id} className="cart_item__details">
                        <p>
                          {content.image && (
                            <img
                              src={`${imageUrl}/images/${content.image}`}
                              alt={content.name}
                            />
                          )}
                        </p>
                        <p>{content.name}</p>
                        <p>${content.price.toFixed(2)}</p>
                        <p>{cartItems[content._id]}</p>
                        <p>
                          ${(content.price * cartItems[content._id]).toFixed(2)}
                        </p>
                        <p>
                          <button onClick={() => RemoveFromCart(content._id)}>
                            Remove
                          </button>
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className={`cart_bottom ${theme}`}>
                <div className="cart_total">
                  <h2>Cart Totals</h2>
                  <div>
                    <div className="cart_total__details">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="cart_total__details">
                      <p>Delivery Fee</p>
                      <p>${deliveryFee.toFixed(2)}</p>
                    </div>
                    <div className="cart_total__details">
                      <b>Total</b>
                      <b>${total.toFixed(2)}</b>
                    </div>
                  </div>
                  <div className="cart_promocode">
                    <div>
                      <p>If you have a promo code, enter it here</p>
                      <div className="promocode_input">
                        <input type="text" placeholder="Promo code" />
                        <button>Submit</button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="checkout_btn"
                    onClick={() =>
                      navigate("/order", {
                        state: { subtotal, deliveryFee, total },
                      })
                    }
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no_itm">
              <h2>No items in the cart!</h2>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
