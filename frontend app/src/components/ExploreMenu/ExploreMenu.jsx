import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { menu_list } from "../../assets/frontend_assets/assets";
import "./ExploreMenu.css";
import PropTypes from "prop-types";

const ExploreMenu = ({ category, setCategory }) => {
  const { theme } = useContext(StoreContext);

  return (
    <div className="explore_menu" id="explore_menu">
      <h1 className={`${theme}`}>Explore our menu</h1>
      <p className="explore_text">
        Discover a wide variety of delicious dishes crafted to satisfy every
        palate. From savory appetizers and hearty main courses to delightful
        desserts and refreshing beverages, our menu has something for everyone.
        Enjoy fresh, high-quality ingredients and creative culinary techniques
        that bring out the best flavors in every bite.
      </p>
      <div className="explore_menu__list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="explore_menu__item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p className={`${theme}`}>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className={`hr ${theme}`} />
    </div>
  );
};
ExploreMenu.propTypes = {
  category: PropTypes.any.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
