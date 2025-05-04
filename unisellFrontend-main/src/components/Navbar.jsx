import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  ShoppingBag,
  Search,
  User,
  ChevronDown,
} from "lucide-react";
import CartModal from "../pages/shop/CartModal";
import avatarImg from "../assets/avatar.png";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { fetchConversations } from "../redux/features/messages/messagesSlice";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const products = useSelector((store) => store.cart.products);
  const { user } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.messages);
  const [logoutUser] = useLogoutUserMutation();

  // Calculate unread messages count
  const unreadCount =
    conversations?.reduce(
      (total, conv) => total + (conv.unreadCount || 0),
      0
    ) || 0;

  // Fetch conversations
  useEffect(() => {
    if (user) {
      dispatch(fetchConversations());
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  // Menu configurations
  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin", icon: "dashboard" },
    { label: "User Management", path: "/dashboard/admin/users", icon: "users" },
    {
      label: "Approve Products",
      path: "/dashboard/admin/approve-products",
      icon: "approval",
    },
    {
      label: "Manage Reports",
      path: "/dashboard/admin/manage-reports",
      icon: "reports",
    },
    {
      label: "Policy Enforcement",
      path: "/dashboard/admin/policy-enforcement",
      icon: "policy",
    },
    { label: "Profile", path: "/dashboard/profile", icon: "profile" },
    { label: "Logout", action: handleLogout, icon: "logout" },
  ];

  const buyerDropdownMenus = [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Messages", path: "/messages", icon: "messages" },
    { label: "Orders", path: "/dashboard/orders", icon: "orders" },
    { label: "Profile", path: "/dashboard/profile", icon: "profile" },
    { label: "Logout", action: handleLogout, icon: "logout" },
  ];

  const sellerDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/seller", icon: "dashboard" },
    { label: "Messages", path: "/dashboard/seller/messages", icon: "messages" },
    {
      label: "Manage Products",
      path: "/dashboard/seller/manage-products",
      icon: "products",
    },
    {
      label: "Manage Orders",
      path: "/dashboard/seller/manage-orders",
      icon: "orders",
    },
    {
      label: "Add New Product",
      path: "/dashboard/seller/add-new-post",
      icon: "add",
    },
    { label: "Profile", path: "/dashboard/profile", icon: "profile" },
    { label: "Logout", action: handleLogout, icon: "logout" },
  ];

  const getDropdownMenus = () => {
    if (user?.role === "admin") return adminDropdownMenus;
    if (user?.role === "seller") return sellerDropdownMenus;
    return buyerDropdownMenus;
  };

  const getMessagePath = () => {
    if (user?.role === "seller" || user?.role === "admin") {
      return "/dashboard/seller/messages";
    }
    return "/messages";
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-primary">
            UniSell<span className="text-gray-800">.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/search" className="hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Link>

          {/* Messages Icon */}
          {user && (
            <div className="relative">
              <Link
                to={getMessagePath()}
                className="hover:text-primary transition-colors relative"
              >
                <MessageCircle className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            </div>
          )}

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="hover:text-primary transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {products.length > 9 ? "9+" : products.length}
              </span>
            )}
          </button>

          {/* User Avatar/Dropdown */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <img
                    src={user?.profileImage || avatarImg}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                  />
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {getDropdownMenus().map((menu, index) =>
                      menu.path ? (
                        <Link
                          key={index}
                          to={menu.path}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-2">{menu.label}</span>
                        </Link>
                      ) : (
                        <button
                          key={index}
                          onClick={() => {
                            menu.action();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-2">{menu.label}</span>
                        </button>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-2 px-4 z-40">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              {user &&
                getDropdownMenus().map((menu, index) => (
                  <li key={index}>
                    {menu.path ? (
                      <Link
                        to={menu.path}
                        className="block py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {menu.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          menu.action();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left py-2"
                      >
                        {menu.label}
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
