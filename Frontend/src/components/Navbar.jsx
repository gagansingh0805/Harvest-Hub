import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import logo from "../assets/logo3.jpg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ initialize navigate
  const { user, clearUser } = useContext(UserContext); // ✅ use clearUser, not logout

  const isActive = (path) => {
    return location.pathname === path
      ? "text-farm-green font-semibold"
      : "text-gray-700 hover:text-farm-green";
  };

  const handleLogout = () => {
    clearUser(); // clear user state + token
    navigate("/"); // redirect to home
  };

  return (
    <nav className="glass-effect shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12  flex items-center justify-center shadow-lg">
                <img
                  src={logo}
                  className="rounded-2xl"
                  alt="Kisan Saathi Logo"></img>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Kisan Saathi
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive(
                "/"
              )} transition-all duration-200 font-medium`}>
              Home
            </Link>
            <Link
              to="/farmer"
              className={`${isActive(
                "/farmer"
              )} transition-all duration-200 font-medium`}>
              Farmer Dashboard
            </Link>
            <Link
              to="/advisor"
              className={`${isActive(
                "/advisor"
              )} transition-all duration-200 font-medium`}>
              Advisor Dashboard
            </Link>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className={`${isActive(
                    "/login"
                  )} transition-all duration-200 font-medium`}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="px-3 py-1">{user.name}</span>
                <button onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-farm-green p-2 rounded-lg hover:bg-white/20 transition-all duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
