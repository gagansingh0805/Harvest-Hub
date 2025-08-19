import React, { useState, useContext } from "react";
import { login } from "../../api/authApi";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import FarmerDashboard from "../FarmerDashboard";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3-removebg-preview.png";

const LoginPage = () => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(formData);
      console.log("Login response:", res);

      updateUser(res); // save user + token
      navigate("/");
    } catch (err) {
      console.error(err.response?.data); // see exact error from API

      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-5">
          {/* <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg"> */}
          <img
            src={logo}
            className=" w-[140px] h-[140px] rounded-2xl"
            alt="Kisan Saathi Logo"></img>
          {/* </div> */}
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mb-5">
          Sign in to your Smart Farming Advisor account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full btn-primary">
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Are you a new farmer here?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Join us today
          </Link>
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400">ℹ️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Secure Login
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Your information is safe with us. We use secure login methods
                  to protect your account at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
