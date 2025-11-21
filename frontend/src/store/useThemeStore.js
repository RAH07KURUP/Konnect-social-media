import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("konnect-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("konnect-theme", theme);
    set({ theme });
    document.documentElement.setAttribute("data-theme", theme); // IMPORTANT
  },
}));
