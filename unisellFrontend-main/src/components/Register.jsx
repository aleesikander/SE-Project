/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../redux/features/auth/authApi"; // Import the register mutation
import { setUser } from "../redux/features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "", // Added username state
    password: "",
    name: "",
    role: "user",
    sellerType: "",
    storeName: "",
    storeDescription: "",
    contactNumber: "", // Added contactNumber state
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation(); // Use register mutation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const dataToSend = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formData.role,
      username: formData.username, // Include username in data
      contactNumber: formData.contactNumber, // Include contactNumber in data
      sellerType: formData.role === "seller" ? formData.sellerType : undefined,
      storeName:
        formData.role === "seller" && formData.sellerType === "business"
          ? formData.storeName
          : undefined,
      storeDescription:
        formData.role === "seller" && formData.sellerType === "business"
          ? formData.storeDescription
          : undefined,
    };

    try {
      const response = await registerUser(dataToSend).unwrap(); // Use the register function
      dispatch(setUser({ user: response.user })); // Dispatch user information
      console.log("Registration successful:", response);
      navigate("/login"); // Redirect to login upon successful registration
    } catch (error) {
      console.error("Error during registration:", error.data || error.message);
      setError(error.data.message || "Registration failed"); // Display error message
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-md border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Create an Account</h2>
        <form
          onSubmit={handleRegister}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username" // Username field
            placeholder="Username"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactNumber" // Contact number field
            placeholder="Contact Number"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={handleChange}
            required
          >
            <option value="user">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {formData.role === "seller" && (
            <div>
              <select
                name="sellerType"
                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                onChange={handleChange}
                required
              >
                <option value="">Select Seller Type</option>
                <option value="business">Business</option>
                <option value="individual">Individual</option>
              </select>
              {formData.sellerType === "business" && (
                <>
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Store Name"
                    className="w-full bg-gray-100 focus:outline-none px-5 py-3 mt-2"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="storeDescription"
                    placeholder="Store Description"
                    className="w-full bg-gray-100 focus:outline-none px-5 py-3 mt-2"
                    onChange={handleChange}
                    required
                  />
                </>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={registerLoading} // Disable button while loading
            className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
          >
            Register
          </button>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message */}
        </form>
        <p className="my-5 italic text-sm text-center">
          Already have an account?
          <Link to="/login" className="text-red-700 px-1 underline">
            Login
          </Link>{" "}
          here.
        </p>
      </div>
    </section>
  );
};

export default Register;
