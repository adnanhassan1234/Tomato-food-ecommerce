import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import LoginModel from "./components/LoginPopup/LoginModel";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Verify from "./pages/VerifyOrder/Verify";
import MyOrder from "./components/MyOrder/MyOrder";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginModel setShowLogin={setShowLogin} /> : null}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order"
            element={<PlaceOrder setShowLogin={setShowLogin} />}
          />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
