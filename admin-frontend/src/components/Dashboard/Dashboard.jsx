import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaChartLine,
  FaChartBar,
} from "react-icons/fa";
import axios from "axios";
import "./dashboard.css";
import Charts from "./Charts/Charts";

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [successTransections, setSuccessTransections] = useState([]);
  const [failTransections, setFailTransections] = useState([]);
  const [successfulEarnings, setSuccessfulEarnings] = useState(0);
  const [failedEarnings, setFailedEarnings] = useState(0);
  const [averageTransaction, setAverageTransaction] = useState(0);
  const [highestTransaction, setHighestTransaction] = useState(0);
  const [lowestTransaction, setLowestTransaction] = useState(0);
  const [averageSuccessfulEarnings, setAverageSuccessfulEarnings] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${baseUrl}/order/list-all-order`);
      const allOrders = response.data.orders;
      setOrders(allOrders);
      const successfulOrders = allOrders.filter(
        (data) => data.payment === true
      );
      const failedOrders = allOrders.filter((data) => data.payment === false);
      setSuccessTransections(successfulOrders);
      setFailTransections(failedOrders);

      const totalSuccessfulEarnings = successfulOrders.reduce(
        (acc, order) => acc + order.amount,
        0
      );
      const totalFailedEarnings = failedOrders.reduce(
        (acc, order) => acc + order.amount,
        0
      );
      const totalEarnings = allOrders.reduce(
        (acc, order) => acc + order.amount,
        0
      );
      const avgTransaction = allOrders.length
        ? (totalEarnings / allOrders.length).toFixed(2)
        : 0;

      const highestTrans = allOrders.length
        ? Math.max(...allOrders.map((order) => order.amount))
        : 0;
      const lowestTrans = allOrders.length
        ? Math.min(...allOrders.map((order) => order.amount))
        : 0;
      const avgSuccessEarnings = successfulOrders.length
        ? (totalSuccessfulEarnings / successfulOrders.length).toFixed(2)
        : 0;

      setSuccessfulEarnings(totalSuccessfulEarnings.toFixed(2));
      setFailedEarnings(totalFailedEarnings.toFixed(2));
      setAverageTransaction(avgTransaction);
      setHighestTransaction(highestTrans.toFixed(2));
      setLowestTransaction(lowestTrans.toFixed(2));
      setAverageSuccessfulEarnings(avgSuccessEarnings);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const dashboardBoxes = [
    {
      icon: <FaBox className="icon" />,
      title: "Total Transactions",
      value: orders.length,
      className: "total",
    },
    {
      icon: <FaCheckCircle className="icon" />,
      title: "Successful Transactions",
      value: successTransections.length,
      className: "successful",
    },
    {
      icon: <FaTimesCircle className="icon" />,
      title: "Failed Transactions",
      value: failTransections.length,
      className: "failed",
    },
    {
      icon: <FaDollarSign className="icon" />,
      title: "Successful Earnings",
      value: `$${successfulEarnings}`,
      className: "successful-earning",
    },
    {
      icon: <FaChartLine className="icon" />,
      title: "Average Transaction",
      value: `$${averageTransaction}`,
      className: "average-transaction",
    },
    {
      icon: <FaDollarSign className="icon" />,
      title: "Failed Earnings",
      value: `$${failedEarnings}`,
      className: "failed-earning",
    },
    {
      icon: <FaChartBar className="icon" />,
      title: "Average Successful Earnings",
      value: `$${averageSuccessfulEarnings}`,
      className: "highest-transaction",
    },
    {
      icon: <FaChartBar className="icon" />,
      title: "Highest Transaction",
      value: `$${highestTransaction}`,
      className: "lowest-transaction ",
    },

    {
      icon: <FaChartLine className="icon" />,
      title: "Lowest Transaction",
      value: `$${lowestTransaction}`,
      className: " average-successful-earning",
    },
  ];

  return (
    <>
      <div className="admin_dashboard">
        {dashboardBoxes.map((box, index) => (
          <div key={index} className={`dashboard_box ${box.className}`}>
            {box.icon}
            <h3>{box.title}</h3>
            <p>{box.value}</p>
          </div>
        ))}
        <div className="chart-container">
          <Charts
            orders={orders}
            successTransections={successTransections}
            failTransections={failTransections}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
