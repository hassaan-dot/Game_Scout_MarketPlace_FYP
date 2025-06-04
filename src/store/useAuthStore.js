import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,

  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },

  setUser: (user) => {
    localStorage.setItem("user", user);
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
