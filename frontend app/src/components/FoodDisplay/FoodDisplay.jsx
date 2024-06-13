import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { contextValue } = useContext(StoreContext);
  const { food_list } = contextValue;

  return (
    <div className="food_display">
      <h2>Top dishes near here</h2>
      <div className="food_display__list">
        {food_list.map((content, index) =>
          category === "All" || category === content.category ? (
            <FoodItem key={index} content={content} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
