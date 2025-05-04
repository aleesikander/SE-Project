import React from "react";

const SellerStats = ({ stats }) => {
  // Provide default values to avoid TypeError
  const totalSales = stats?.totalSales || 0;
  const totalRevenue = stats?.totalRevenue || 0;
  const totalOrdersManaged = stats?.totalOrdersManaged || 0;

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Sales</h2>
        <p className="text-2xl">{totalSales}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Revenue</h2>
        <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Total Orders Managed</h2>
        <p className="text-2xl">{totalOrdersManaged}</p>
      </div>
    </div>
  );
};

export default SellerStats;
