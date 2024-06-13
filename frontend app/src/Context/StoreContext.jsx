import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // const AddToCart = (itmId) => {
  //   if (!cartItems[itmId]) {
  //     setCartItems((prev) => ({ ...prev, [itmId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itmId]: prev[itmId] + 1 }));
  //   }
  // };
  
  const AddToCart = (itmId) => {
    const updatedCart = { ...cartItems };
    updatedCart[itmId] = (updatedCart[itmId] || 0) + 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Item added to cart!", {
      position: "top-right",
      duration: 5000,
      style: {
        background: theme === "light" ? "#333" : "#fff",
        color: theme === "light" ? "#fff" : "#333",
      },
    });
  };

  // const RemoveFromCart = (itmId) => {
  //   setCartItems((prev) => ({ ...prev, [itmId]: prev[itmId] - 1 }));
  // };
  const RemoveFromCart = (itmId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itmId] > 1) {
      updatedCart[itmId] -= 1;
    } else {
      delete updatedCart[itmId];
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Remove quantity to cart!", {
      position: "top-right",
      duration: 5000,
      style: {
        background: theme === "light" ? "#333" : "#fff",
        color: theme === "light" ? "#fff" : "#333",
      },
    });
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    AddToCart,
    RemoveFromCart,
  };

  useEffect(() => {}, [cartItems]);

  return (
    <StoreContext.Provider value={{ theme, toggleTheme, contextValue }}>
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        {children}
      </div>
    </StoreContext.Provider>
  );
};

export { StoreContextProvider };
