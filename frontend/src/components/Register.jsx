
import { useState } from "react";
import axiosInstance from "../api/axios.config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/api/auth/register", form);
      alert("Registration successful! Please login now.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 px-4 md:px-6 py-8">
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-md md:max-w-lg hover:shadow-3xl transition-shadow duration-300">
      
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600 text-sm md:text-base">Join us and start sharing moments</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        
        {/* Username Input */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
            Username
          </label>
          <div className="relative">
            <input 
              type="text"
              name="username"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-300 text-sm md:text-base"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-300 text-sm md:text-base"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-300 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-300 text-sm md:text-base"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg ${
            loading 
              ? "bg-gray-400 cursor-not-allowed text-white" 
              : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white hover:shadow-xl transform hover:-translate-y-1"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <p className="text-sm md:text-base text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-bold hover:text-blue-600 hover:underline transition-colors duration-300">
            Login Here
          </a>
        </p>
      </form>
    </div>
  </div>
);
};

export default Register;
