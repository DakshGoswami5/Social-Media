import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const verifyUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`, {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });

      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setIsLoggedIn(false);
    }
  };

  verifyUser();
}, []);

  const handleLogout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    
    setIsLoggedIn(false);
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    // Even if backend fails, clear frontend state
    setIsLoggedIn(false);
    navigate("/login");
  }
};


  return (
  <nav className="w-full px-4 md:px-6 py-4 md:py-6">
    <div className="max-w-7xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-5">
      <div className="flex justify-between items-center">
        
        {/* Logo Section */}
        <h1
          className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 cursor-pointer hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          Social Media
        </h1>

        {/* Navigation Links - Mobile: Compact, Desktop: Spacious */}
        <div className="flex gap-2 md:gap-6 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-400 transition-all duration-300 font-medium md:font-semibold text-sm md:text-base px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl hover:bg-white/10 backdrop-blur-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium md:font-semibold text-sm md:text-base px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium md:font-semibold text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  </nav>
);
};

export default Navbar;
