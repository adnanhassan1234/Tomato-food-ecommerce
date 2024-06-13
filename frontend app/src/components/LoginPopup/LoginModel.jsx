import { useContext, useState } from "react";
import "./LoginModel.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const LoginModel = ({ setShowLogin }) => {
  const { theme } = useContext(StoreContext);
  const [currAuth, setCurrAuth] = useState("Sign Up");
  return (
    <div className="login_popup">
      <form className="login_popup__container">
        <div className="login_popup__title">
          <h2 className={`cuurent_white__bg ${theme} `}>{currAuth}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login_popup__input">
          {currAuth === "Login" ? (
            <>
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Your email" required />
            </>
          ) : (
            <>
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Your email" required />
              <input type="password" placeholder="Your password" required />
            </>
          )}
        </div>
        <button>{currAuth === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login_popup__condition">
          <input type="checkbox" name="" id="" required />
          <p className={`cuurent_white__bg ${theme} `}>
            By continuing, i agree to the terms f use & privacy policy.
          </p>
        </div>{" "}
        <br />
        <div className={`cuurent_white__bg ${theme} `}>
          {currAuth === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrAuth("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrAuth("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginModel;
