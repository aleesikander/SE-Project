import React from "react";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";

const AdminDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="nav__logo">
            <Link to="/" className="text-2xl font-bold text-primary">
              UniSell<span className="text-gray-800">.</span>
            </Link>
            <p className="text-xs italic mt-1">Admin Dashboard</p>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Administration
            </h3>
          </div>

          <ul className="mt-3 space-y-1 px-6">
            <li>
              <NavLink
                to="/dashboard/admin"
                end
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Dashboard Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/users"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/approve-products"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Approve Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/manage-reports"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Manage Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/policy-enforcement"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Policy Enforcement
              </NavLink>
            </li>
          </ul>

          <div className="px-6 mt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </h3>
          </div>

          <ul className="mt-3 space-y-1 px-6">
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Profile Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
