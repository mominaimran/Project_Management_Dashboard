import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function SignupForm() {
  const { signup, isSigningUp, error, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) toast.success("Signup successful!");
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //cliend side validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    await signup(formData);
  };

  return (
    <div className="card w-full bg-white rounded-lg shadow-lg md:shadow-xl ring-1 ring-[#898a87]/10">
      <div className="card-body pb-4 px-4 sm:px-6">
        {/* Title */}
        <h2 className="card-title hidden md:block text-[#303030] text-xl lg:text-2xl font-heading text-center">
          Join ProjectHub
        </h2>
        <p className="text-[#898a87] text-sm md:text-base text-center mb-2">
          Start managing your freelance projects efficiently
        </p>

        {/* Sign up form */}
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-5 pt-2">
          {/* Full Name */}
          <div className="form-control w-full">
            <label htmlFor="name" className="label">
              <span className="label-text text-[#303030] font-medium text-sm md:text-base">
                Full Name
              </span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#898a87] w-4 h-4" />
              <input
                value={formData.name}
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="input w-full rounded-md pl-10 pr-10 
                bg-[#f8f0be]/20 hover:bg-[#f8f0be]/30 
                border border-[#d1d5db] 
                focus:outline-none focus:ring-2 focus:ring-[#ffd75f] 
                text-sm md:text-base"
              />
            </div>
          </div>

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
                placeholder="Create a secure password"
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
            disabled={isSigningUp}
            className="btn border-0 w-full bg-[#ffd75f] hover:bg-[#ffd75f]/90 text-[#303030] mt-5 md:mt-6 
              shadow-lg transition-all duration-200 transform hover:scale-[1.02] h-10 md:h-11 text-sm md:text-base rounded-md"
          >
            {isSigningUp ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Start Your Freelance Journey"
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-xs md:text-sm text-[#898a87] pt-4 border-t border-[#e1e4e2]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#303030] hover:underline transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
