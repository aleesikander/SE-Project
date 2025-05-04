import React from "react";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";

const navItems = [
  // { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/seller/manage-products", label: "Manage My Products" },
  { path: "/dashboard/seller/add-new-post", label: "Add Product" },
  { path: "/dashboard/seller/manage-orders", label: "Manage Orders" },
  { path: "/dashboard/orders", label: "Your orders" }, // Added Manage Orders link
  { path: "/dashboard/profile", label: "Profile" },
];

const SellerDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      console.log("User logged out successfully");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="nav__logo">
          <Link to="/">
            Unisell<span>.</span>
          </Link>
          <p className="text-xs italic">Seller Dashboard</p>
        </div>
        <hr className="mt-5" />
        <nav>
          <ul className="space-y-5 pt-5">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-black"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SellerDashboard;
