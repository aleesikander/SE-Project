/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login mutation and unwrap the response
      const response = await loginUser({ email, password }).unwrap();

      // Correctly access the user ID from the response
      const userId = response.user._id; // Adjusted to correctly get the user ID

      // Check if userId exists before storing
      if (userId) {
        localStorage.setItem("userId", userId); // Store user ID in local storage
        console.log("User ID saved:", userId); // Log the saved user ID
      } else {
        console.error("User ID not found in response.");
      }

      // Assuming the token is returned in the response
      const token = response.token; // Adjust according to your API response structure
      localStorage.setItem("token", token); // Store the token in localStorage

      console.log("Token saved:", token); // Log the saved token

      // Dispatch user data or navigate as needed
      dispatch(setUser({ user: response.user })); // Assuming response.user contains user data
      navigate("/"); // Redirect to dashboard or any other page
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please check your credentials."); // Optionally set an error message
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please login</h2>
        <form
          onSubmit={handleLogin}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            type="text"
            value={email}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {
            message && <p className="text-red-500">{message}</p> // Display error message if any
          }
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
          >
            Login
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Don't have an account?
          <Link to="/register" className="text-red-700  px-1 underline">
            {" "}
            Register{" "}
          </Link>{" "}
          here.
        </p>
      </div>
    </section>
  );
};

export default Login;
