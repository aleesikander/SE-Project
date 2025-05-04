import React from "react";
import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import { Bar } from "react-chartjs-2";
import UserStats from "./UserStats";

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, isLoading, error } = useGetUserStatsQuery(user?.email);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading user stats...</p>;
  }

  if (error || !stats) {
    return <p className="text-center text-gray-500">No stats available.</p>;
  }

  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Purchases"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats.totalPayments,
          stats.totalReviews,
          stats.totalPurchasedProducts,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p className="text-gray-500">
          Hi, {user?.username}! Welcome to your dashboard.
        </p>
      </div>
      <UserStats stats={stats} />
      <div className="my-6">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default UserDMain;
