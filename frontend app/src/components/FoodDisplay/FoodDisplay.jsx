import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { contextValue } = useContext(StoreContext);
  const { food_list, isLoading } = contextValue;

  return (
    <div className="food_display">
      <h2>Top dishes near here</h2>
      {isLoading ? (
        <div className="loading">
          <br />
          <h3>Loading food items...</h3>
        </div>
      ) : (
        <div className="food_display__list">
          {food_list.map((content, index) =>
            category === "All" || category === content.category ? (
              <FoodItem key={index} content={content} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
