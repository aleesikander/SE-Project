import React from "react";
import { useSelector } from "react-redux";
import { useGetTotalRevenueQuery } from "../../../../redux/features/auth/authApi";
import { Link } from "react-router-dom";

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: revenueData, error, isLoading } = useGetTotalRevenueQuery();

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">Loading revenue data...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching revenue data.
      </div>
    );
  }

  if (!revenueData || revenueData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No revenue data available.
      </div>
    );
  }

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Admin Dashboard
                </h3>
                <p className="text-gray-500">
                  Hi, {user?.username}! Welcome to the admin dashboard.
                </p>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link to="/dashboard/admin/users">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Manage Users
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Contact Number
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Total Revenue (PKR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((seller) => (
                  <tr
                    key={seller.sellerId}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-center">
                      {seller.email} {/* Updated to display email */}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {seller.contactNumber}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {seller.totalRevenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default AdminDMain;
