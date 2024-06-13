import { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ content }) => {
  const { _id, name, price, image, description } = content;

  const { contextValue, theme } = useContext(StoreContext);
  const { cartItems, AddToCart, RemoveFromCart } = contextValue;

  return (
    <div className={`food_item ${theme} `}>
      <div className="food_item__container">
        <img src={image} className="food_item__img" alt={name} />
        {!cartItems[_id] ? (
          <img
            className="add_icon"
            src={assets.add_icon_white}
            alt="Rating stars"
            onClick={() => AddToCart(_id)}
          />
        ) : (
          <div className="food_itm__counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => RemoveFromCart(_id)}
            />
            <p className={`quantity ${theme}`}>{cartItems[_id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => AddToCart(_id)}
            />
          </div>
        )}
      </div>
      <div className="food_item__info">
        <div className="food_item__rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <div className={`food_item__description ${theme}`}>{description}</div>
        <div className="food_item__price">${price}</div>
      </div>
    </div>
  );
};

export default FoodItem;
