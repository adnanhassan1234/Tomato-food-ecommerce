import { useContext, useState } from "react";
import "./LoginModel.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const LoginModel = ({ setShowLogin }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const { contextValue, theme } = useContext(StoreContext);
  const { token, setToken } = contextValue;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [currAuth, setCurrAuth] = useState("Sign Up");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data =
      currAuth === "Sign Up"
        ? {
            name: formData?.name,
            email: formData?.email,
            password: formData?.password,
          }
        : {
            email: formData?.email,
            password: formData?.password,
          };

    setIsLoading(true);

    try {
      const url =
        currAuth === "Sign Up"
          ? `${baseUrl}/user/register`
          : `${baseUrl}/user/login`;
      const response = await axios.post(url, data);
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          style: {
            background: theme === "light" ? "#333" : "#fff",
            color: theme === "light" ? "#fff" : "#333",
          },
        });
        if (currAuth === "Sign Up") {
          setCurrAuth("Login");
        } else {
          setShowLogin(false);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.id);

        }
      }
    } catch (error) {
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        style: {
          background: theme === "light" ? "#333" : "#fff",
          color: theme === "light" ? "#fff" : "#333",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login_popup">
      <form className="login_popup__container" onSubmit={handleSubmit}>
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
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}
        </div>
        
        <button type="submit">
          {isLoading
            ? "Processing..."
            : currAuth === "Sign Up"
            ? "Create account"
            : "Login"}
        </button>
        <div className="login_popup__condition">
          <input type="checkbox" required />
          <p className={`cuurent_white__bg ${theme} `}>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
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
