import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import ShopPage from "../pages/shop/ShopPage";
import ErrorPage from "../components/ErrorPage";
import Search from "../pages/search/Search";
import Login from "../components/Login";
import Register from "../components/Register";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import SingleProduct from "../pages/shop/productdetais/SingleProduct";
import PaymentSuccess from "../components/PaymentSuccess";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import SellerDMain from "../pages/dashboard/seller/SellerDMain";
import AddSellerProduct from "../pages/dashboard/seller/AddSellerProduct";
import ManageSellerProducts from "../pages/dashboard/seller/ManageSellerProducts";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageSellerOrders from "../pages/dashboard/seller/ManageSellerOrders";
import AboutUs from "../pages/about-us/AboutUs";
import MessagePage from "../pages/messages/MessagePage";
import Inbox from "../pages/messages/Inbox";
import MessageThread from "../pages/messages/MessageThread";
import ApproveProducts from "../pages/dashboard/admin/ApproveProducts";
import ManageReports from "../pages/dashboard/admin/ManageReports";
import PolicyEnforcement from "../pages/dashboard/admin/PolicyEnforcement";
import AdminStats from "../pages/dashboard/admin/dashboard/AdminStats";
import Unauthorized from "../components/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      { path: "/success", element: <PaymentSuccess /> },
      { path: "/orders/:orderId", element: <OrderDetails /> },
      { path: "/orders", element: <UserOrders /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/unauthorized", element: <Unauthorized /> },

      // Unified Messaging Routes
      {
        path: "/messages",
        children: [
          { index: true, element: <Inbox /> },
          { path: ":userId", element: <MessageThread /> },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // User routes
      { index: true, element: <UserDMain /> },
      { path: "orders", element: <UserOrders /> },
      { path: "profile", element: <UserProfile /> },
      { path: "reviews", element: <UserReviews /> },

      // Seller routes
      { path: "seller", element: <SellerDMain /> },
      { path: "seller/manage-orders", element: <ManageSellerOrders /> },
      { path: "seller/add-new-post", element: <AddSellerProduct /> },
      { path: "seller/manage-products", element: <ManageSellerProducts /> },

      // Admin routes
      {
        path: "admin",
        element: <AdminDMain />,
        children: [
          { index: true, element: <AdminStats /> },
          { path: "users", element: <ManageUser /> },
          { path: "approve-products", element: <ApproveProducts /> },
          { path: "manage-reports", element: <ManageReports /> },
          { path: "policy-enforcement", element: <PolicyEnforcement /> },
        ],
      },
    ],
  },
]);

export default router;
