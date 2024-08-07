// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Order.css";
// import { toast } from "react-toastify";
// import Transection from "../../components/Transection/Transection";
// import TransectionDetails from "../../components/Transection/TransectionDetails/TransectionDetails";

// const Order = () => {
//   const baseUrl = import.meta.env.VITE_API_URL;
//   const [orders, setOrders] = useState([]);
//   const [successTransections, setSuccessTransections] = useState([]);
//   const [failTransections, setFailTransections] = useState([]);
//   const [detail, setDetail] = useState({
//     id: 0,
//     tag: "TOTAL TRANSACTIONS",
//   });

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/order/list-all-order`);
//       const allOrders = response.data.orders;
//       setOrders(allOrders);
//       setSuccessTransections(allOrders.filter((data) => data.payment === true));
//       setFailTransections(allOrders.filter((data) => data.payment === false));
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const statusHandler = async (e, orderId) => {
//     try {
//       const res = await axios.post(`${baseUrl}/order/status`, {
//         orderId,
//         status: e.target.value,
//       });

//       if (res.status === 200) {
//         toast.success(res.data?.message, {
//           position: "top-right",
//           autoClose: 5000,
//           style: {
//             background: "#333",
//             color: "#fff",
//           },
//         });
//         fetchAllOrders();
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   const options = [
//     "TOTAL TRANSACTIONS",
//     "SUCCESSFUL TRANSACTIONS",
//     "FAILED TRANSACTIONS",
//   ];

//   return (
//     <div className="order-page">
//       <h2>My Orders</h2>
//       <div className="transection_det">
//         <TransectionDetails
//           options={options}
//           detail={detail}
//           setDetail={setDetail}
//         />
//       </div>

//       <div className="order-list">
//         {(() => {
//           switch (detail.tag) {
//             case "TOTAL TRANSACTIONS":
//               return (
//                 <Transection
//                   orders={orders}
//                   statusHandler={statusHandler}
//                   TransectionLength={
//                     (orders.length,
//                     orders.length,
//                     successTransections,
//                     failTransections)
//                   }
//                 />
//               );
//             case "SUCCESSFUL TRANSACTIONS":
//               return (
//                 <Transection
//                   orders={successTransections}
//                   statusHandler={statusHandler}
//                 />
//               );
//             case "FAILED TRANSACTIONS":
//               return (
//                 <Transection
//                   orders={failTransections}
//                   statusHandler={statusHandler}
//                 />
//               );
//             default:
//               break;
//           }
//         })()}
//       </div>
//     </div>
//   );
// };

// export default Order;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { toast } from "react-toastify";
import Transection from "../../components/Transection/Transection";
import TransectionDetails from "../../components/Transection/TransectionDetails/TransectionDetails";
import FilterForm from "../../components/FilterForm/FilterForm";

const Order = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [successTransections, setSuccessTransections] = useState([]);
  const [failTransections, setFailTransections] = useState([]);
  const [detail, setDetail] = useState({
    id: 0,
    tag: "TOTAL TRANSACTIONS",
  });
  const [filters, setFilters] = useState({
    firstname: "",
    country: "",
    fromDate: "",
    toDate: "",
  });

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${baseUrl}/order/list-all-order`);
      const allOrders = response.data.orders;
      setOrders(allOrders);
      setFilteredOrders(allOrders);
      setSuccessTransections(allOrders.filter((data) => data.payment === true));
      setFailTransections(allOrders.filter((data) => data.payment === false));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterClick = () => {
    // Apply filters based on current state
    let tempOrders = [...orders];

    if (filters.firstname.trim()) {
      const formattedFirstname = filters.firstname.trim().toLowerCase();
      tempOrders = tempOrders.filter((order) =>
        order.address.firstname.toLowerCase().includes(formattedFirstname)
      );
    }
    if (filters.country.trim()) {
      const formattedCountry = filters.country.trim().toLowerCase();
      tempOrders = tempOrders.filter((order) =>
        order.address.country.toLowerCase().includes(formattedCountry)
      );
    }
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate).toISOString().split("T")[0];
      tempOrders = tempOrders.filter(
        (order) => order.date.split("T")[0] >= fromDate
      );
    }
    if (filters.toDate) {
      const toDate = new Date(filters.toDate).toISOString().split("T")[0];
      tempOrders = tempOrders.filter(
        (order) => order.date.split("T")[0] <= toDate
      );
    }

    setFilteredOrders(tempOrders);
  };

  const handleResetClick = () => {
    setFilters({
      firstname: "",
      country: "",
      fromDate: "",
      toDate: "",
    });
    setFilteredOrders(orders);
  };

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${baseUrl}/order/status`, {
        orderId,
        status: e.target.value,
      });

      if (res.status === 200) {
        toast.success(res.data?.message, {
          position: "top-right",
          autoClose: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const options = [
    "TOTAL TRANSACTIONS",
    "SUCCESSFUL TRANSACTIONS",
    "FAILED TRANSACTIONS",
  ];

  return (
    <div className="order-page">
      <h2>My Orders</h2> <br />
      <div className="filter-container">
        <FilterForm
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleFilterClick={handleFilterClick}
          handleResetClick={handleResetClick}
        />
      </div>
      <div className="transection_det">
        <TransectionDetails
          options={options}
          detail={detail}
          setDetail={setDetail}
        />
      </div>

      <div className="order-list">
        {(() => {
          switch (detail.tag) {
            case "TOTAL TRANSACTIONS":
              return (
                <Transection
                  orders={filteredOrders}
                  statusHandler={statusHandler}
                  lenght={filteredOrders.length}
                />
              );
            case "SUCCESSFUL TRANSACTIONS":
              return (
                <Transection
                  orders={successTransections}
                  statusHandler={statusHandler}
                  lenght={successTransections.length}
                />
              );
            case "FAILED TRANSACTIONS":
              return (
                <Transection
                  orders={failTransections}
                  statusHandler={statusHandler}
                  lenght={failTransections.length}
                />
              );
            default:
              break;
          }
        })()}
      </div>
    </div>
  );
};

export default Order;
