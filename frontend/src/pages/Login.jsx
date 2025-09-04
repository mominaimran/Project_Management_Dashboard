import React, { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { LoginLeft } from "../components/LoginLeft.jsx";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { login, isLoggingIn, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    await login(formData);
  };
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 lg:w-1/2 xl:w-1/2 bg-[#f8f0be] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-[#ffd75f]/20 rounded-full -translate-y-8 md:-translate-y-16 translate-x-8 md:translate-x-16"></div>
        <div className="absolute bottom-12 right-40 w-16 h-16 md:w-24 md:h-24 bg-[#ffd75f]/30 rounded-full"></div>
        <div className="absolute top-32 md:top-40 left-24 md:left-20 w-12 h-12 md:w-16 md:h-16 bg-[#e1e4e2]/40 rounded-full"></div>

        <LoginLeft />
      </div>

      {/* Right Side - Login Form - Full width on small devices, half width on larger */}
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 bg-white relative flex">
        {/* Decorative elements for right side */}
        <div className="absolute top-8 right-8 md:top-12 md:right-18 w-16 h-16 md:w-20 md:h-20 bg-[#ffd75f]/10 rounded-full"></div>
        <div className="absolute bottom-18 md:bottom-16 left-20 md:left-20 w-16 h-16 md:w-16 md:h-16 bg-[#e1e4e2]/40 rounded-full"></div>

        <div className="w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Small device brand header - only visible on mobile */}
            <div className="md:hidden text-center mb-4 sm:mb-8">
              <h1
                className="text-2xl sm:text-3xl text-[#303030] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ProjectHub
              </h1>
            </div>

            {/* <LoginForm /> */}
            <div className="card w-full bg-white rounded-lg shadow-lg md:shadow-xl ring-1 ring-[#898a87]/10">
              <div className="card-body pb-4 px-4 sm:px-6">
                {/* Title */}
                <h2 className="card-title hidden md:block text-[#303030] text-xl lg:text-2xl font-heading text-center">
                  Login to ProjectHub
                </h2>
                <p className="text-[#898a87] text-sm md:text-base text-center mb-2">
                  Start managing your freelance projects efficiently
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 md:space-y-5 pt-2"
                >
                  {/* Email */}
                  <div className="form-control w-full">
                    <label htmlFor="email" className="label">
                      <span className="label-text text-[#303030] font-medium text-sm md:text-base">
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#898a87] w-4 h-4" />
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="input w-full rounded-md pl-10 pr-10 
                bg-[#f8f0be]/20 hover:bg-[#f8f0be]/30 
                border border-[#d1d5db] 
                focus:outline-none focus:ring-2 focus:ring-[#ffd75f] 
                text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                      <span className="label-text text-[#303030] font-medium text-sm md:text-base">
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#898a87] w-4 h-4" />
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="input w-full rounded-md pl-10 pr-10 
               bg-[#f8f0be]/20 hover:bg-[#f8f0be]/30 
                border border-[#d1d5db] 
                focus:outline-none focus:ring-2 focus:ring-[#ffd75f] 
                text-sm md:text-base"
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        style={{ pointerEvents: "auto", zIndex: 10 }} // zIndex aur pointer events force karo
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#898a87] hover:text-[#303030] transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="btn border-0 w-full bg-[#ffd75f] hover:bg-[#ffd75f]/90 text-[#303030] mt-5 md:mt-6 
              shadow-lg transition-all duration-200 transform hover:scale-[1.02] h-10 md:h-11 text-sm md:text-base rounded-md"
                  >
                    {isLoggingIn ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Login Now"
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center text-xs md:text-sm text-[#898a87] pt-4 border-t border-[#e1e4e2]">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-[#303030] hover:underline transition-all duration-200"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
