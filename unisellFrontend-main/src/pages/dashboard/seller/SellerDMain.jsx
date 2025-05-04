import React from "react";
import { useGetAdminStatsQuery } from "../../../redux/features/stats/statsApi";
import SellerStats from "./SellerStats";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SellerDMain = () => {
  const { data: stats, isLoading } = useGetAdminStatsQuery();

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!stats)
    return <p className="text-center text-red-600">No stats available.</p>;

  // Data for the bar chart
  const data = {
    labels: ["Total Sales", "Total Products", "Total Reviews"],
    datasets: [
      {
        label: "Seller Stats",
        data: [stats.totalSales, stats.totalProducts, stats.totalReviews],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Welcome to Seller Dashboard
      </h1>

      {/* Stats Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <SellerStats stats={stats} />
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Your Performance Overview
        </h2>
        <div className="flex justify-center">
          {/* Chart Container with Increased Width and Height */}
          <div
            className="w-full"
            style={{ maxWidth: "800px", height: "500px" }}
          >
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: {
                      font: {
                        size: 16, // Increase font size of x-axis labels
                      },
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 16, // Increase font size of y-axis labels
                      },
                      beginAtZero: true, // Start y-axis from zero
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDMain;
