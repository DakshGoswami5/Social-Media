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
    <nav className="w-full mt-8 max-w-5xl flex justify-between items-center px-6 py-4 bg-gray-800 shadow-sm rounded-2xl mx-auto">
      <h1
        className="text-2xl font-medium text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        Social Media
      </h1>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-white hover:text-blue-500 transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-blue-500 transition font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 transition font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
