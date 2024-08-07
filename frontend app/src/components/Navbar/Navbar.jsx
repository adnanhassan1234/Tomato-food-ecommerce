import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { theme, contextValue, toggleTheme } = useContext(StoreContext);

  const { cartItems, token, setToken } = contextValue;
  const totalItems = Object.values(cartItems).reduce(
    (sum, item) => sum + item,
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className={`navbar_menu ${theme} `}>
        <Link
          to="/"
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore_menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#download_app"
          className={menu === "mobile-app" ? "active" : ""}
          onClick={() => setMenu("mobile-app")}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar_right">
        <button
          className={
            theme === "light" ? " toggle_btn black" : " toggle_btn white"
          }
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <i className="fa fa-moon-o" aria-hidden="true"></i>
          ) : (
            <span>
              <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            </span>
          )}{" "}
          mode
        </button>
        <img src={assets.search_icon} alt="" />
        <div className="navbar_search__icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
            {totalItems ? <div className="dot">{totalItems}</div> : null}
          </Link>
        </div>
        {!token ? (
          <button
            className={`signin ${theme} `}
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </button>
        ) : (
          <div className={`navbar_profile ${theme} `}>
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar_profile__dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <Link to="/myOrder">
                  <p>Orders</p>
                </Link>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
