import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("konnect-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("konnect-theme", theme);
    set({ theme });
  },
}));
