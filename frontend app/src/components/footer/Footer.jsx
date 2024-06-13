import { assets } from "../../assets/frontend_assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer_content">
        <div className="footer_content__left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aut
            ex itaque corrupti odio repellendus atque, commodi sit sequi
            veritatis, animi explicabo beatae. Unde reiciendis deleniti earum
            deserunt omnis nisi.
          </p>
          <div className="footer_social__icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer_content__center">
          <h2>COMPANY </h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer_content__right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <b>Contact:</b> +92-3476275532
            </li>
            <li>
              <b>Email:</b> ah5404219@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <p className="footer_copy">
        {" "}
        <br />
        <span> Copyright 2024 &copy; Tomato.com - All Right Reserved!</span>
      </p>
    </div>
  );
};

export default Footer;
