import React from "react";

const UserStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Payments</h2>
        <p className="text-2xl">{stats.totalPayments}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Purchased Products</h2>
        <p className="text-2xl">{stats.totalPurchasedProducts}</p>
      </div>
    </div>
  );
};

export default UserStats;
