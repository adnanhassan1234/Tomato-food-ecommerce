import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Orders/Order";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard/Dashboard";


const App = () => {
  return (
    <>
      <Navbar />
      <hr />
      <div className="app_content">
        <Sidebar />
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<List />} />
          <Route path="/add/:id?" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
