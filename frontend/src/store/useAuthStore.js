import { create } from "zustand";
import {
  loginUser,
  logoutUser,
  signupUser,
  checkAuth,
} from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isCheckingAuth: true,

  signup: async (formData) => {
    set({ isSigningUp: true, error: null });
    try {
      const data = await signupUser(formData);
      set({ user: data.user, isSigningUp: false });
      return data.user;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Signup failed",
        isSigningUp: false,
      });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true, error: null });
    try {
      const data = await loginUser(formData);
      set({ user: data.user, isLoggingIn: false });
      return data.user;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoggingIn: false,
      });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true, error: null });
    try {
      await logoutUser();
      set({ user: null, isLoggingOut: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed",
        isLoggingOut: false,
      });
    }
  },

  checkAuthUser: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const data = await checkAuth();
      set({ user: data.user, isCheckingAuth: false });
      return data.user;
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
