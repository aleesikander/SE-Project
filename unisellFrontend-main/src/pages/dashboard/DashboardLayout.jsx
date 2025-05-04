import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import SellerDashboard from "./SellerDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  if (!user) {
    console.log("You must be logged in!");
    return <Navigate to="/login" replace />;
  }

  // Render different dashboards based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "user":
        return <UserDashboard />;
      case "seller":
        return <SellerDashboard />;
      default:
        return <Navigate to="/unauthorized" replace />; // Redirect on unknown role
    }
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      {/* Sidebar - Render different dashboards based on user role */}
      <aside className="lg:w-1/5 sm:w-2/5 w-full border">
        {renderDashboard()}
      </aside>

      {/* Main Content */}
      <main className="p-8 bg-white w-full border mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
