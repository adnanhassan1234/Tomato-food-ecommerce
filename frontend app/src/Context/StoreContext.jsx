import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState("light");
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [food_list, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [userId]);

  const fetchFoodAllItemList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/food/get-all-food`);
      if (res.data) {
        setFoodList(res.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching food items");
    } finally {
      setIsLoading(false);
    }
  };
  // const loadCartData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get(`${baseUrl}/cart/get-all-cart`, {itmId} ,{
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (res.data) {
  //       setCartItems(res.data.cartData);
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while fetching cart items");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    fetchFoodAllItemList();
    // loadCartData();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const AddToCart = async (itmId) => {
    const updatedCart = { ...cartItems };
    updatedCart[itmId] = (updatedCart[itmId] || 0) + 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (token) {
      try {
        const res = await axios.post(
          `${baseUrl}/cart/add-cart`,
          { itmId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(res.data?.message, {
          position: "top-right",
          duration: 5000,
          style: {
            background: theme === "light" ? "#333" : "#fff",
            color: theme === "light" ? "#fff" : "#333",
          },
        });
      } catch (error) {
        toast.error("An error occurred while adding item to cart");
      }
    }
  };

  const RemoveFromCart = async (itmId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itmId] > 1) {
      updatedCart[itmId] -= 1;
    } else {
      delete updatedCart[itmId];
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (token) {
      try {
        const res = await axios.post(
          `${baseUrl}/cart/remove-cart`,
          { itmId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(res.data?.message, {
          position: "top-right",
          duration: 5000,
          style: {
            background: theme === "light" ? "#333" : "#fff",
            color: theme === "light" ? "#fff" : "#333",
          },
        });
      } catch (error) {
        toast.error("An error occurred while removing item from cart");
      }
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    AddToCart,
    RemoveFromCart,
    token,
    setToken,
    isLoading,
    userId,
    baseUrl
  };

  return (
    <StoreContext.Provider value={{ theme, toggleTheme, contextValue }}>
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        {children}
      </div>
    </StoreContext.Provider>
  );
};

export { StoreContextProvider };
