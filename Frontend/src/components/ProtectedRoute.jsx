import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");

    console.log("ProtectedRoute check:", {
      loading,
      user: !!user,
      token: !!token,
    });

    if (!loading) {
      if (!user && !token) {
        console.log("No authentication found - redirecting to login");
        navigate("/login", { replace: true });
        return;
      }
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    console.log("Still loading...");
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check if user is not authenticated
  const token = localStorage.getItem("token");
  if (!user && !token) {
    console.log("Not authenticated - showing redirect message");
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-red-600 font-semibold">Access Denied</p>
          <p className="text-gray-600">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  console.log("User authenticated - rendering children");
  return children;
};

export default ProtectedRoute;
