import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = ({ orders, successTransections, failTransections }) => {
  const barData = {
    labels: [
      "Total Transactions",
      "Successful Transactions",
      "Failed Transactions",
    ],
    datasets: [
      {
        label: "Transactions",
        data: [
          orders.length,
          successTransections.length,
          failTransections.length,
        ],
        backgroundColor: ["#007bff", "#28a745", "#FF6347"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <Bar data={barData} options={barOptions} />
    </>
  );
};

export default Charts;
