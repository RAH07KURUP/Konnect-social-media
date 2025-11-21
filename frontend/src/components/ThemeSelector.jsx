import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

/**
 * ThemeSelector - sets data-theme on <html> and persists selection
 * Dropdown is opaque (class theme-dropdown-panel) and theme-aware
 */

const ThemeSelector = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const [active, setActive] = useState(() => {
    if (typeof window === "undefined") return "synthwave";
    return localStorage.getItem("konnect-theme") || "synthwave";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", active);
      localStorage.setItem("konnect-theme", active);
    }
  }, [active]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest?.(".theme-dropdown")) setOpen(false);
    };
    window.addEventListener("click", onDocClick);
    return () => window.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="relative theme-dropdown">
      <button
        onClick={() => setOpen(v => !v)}
        className="p-2 rounded-full bg-base-100 border border-base-300 hover:bg-base-200 transition"
        title="Select theme"
      >
        <PaletteIcon className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-3 w-64 rounded-2xl overflow-hidden z-50 shadow-lg theme-dropdown-panel"
          role="menu"
        >
          <div className="p-2 max-h-72 overflow-y-auto">
            {THEMES.map((t) => {
              const isActive = t.name === active;
              return (
                <button
                  key={t.name}
                  onClick={() => {setActive(t.name);setTheme(t.name);}}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition ${isActive ? "bg-primary/10 ring-1 ring-primary/20" : "hover:bg-base-200"}`}
                >
                  <div className="w-8 h-8 rounded-md grid place-items-center bg-base-100 border border-base-300">
                    <PaletteIcon className={`w-4 h-4 ${isActive ? "text-primary" : "text-base-content"}`} />
                  </div>

                  <div className="text-left">
                    <div className={`font-medium text-sm ${isActive ? "text-primary" : "text-base-content"}`}>{t.label}</div>
                    <div className="text-xs opacity-60">{t.subtitle || ""}</div>
                  </div>

                  <div className="ml-auto flex gap-1">
                    {t.colors.map((c, i) => (
                      <span key={i} className="w-3 h-3 rounded-full border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="p-3 border-t border-base-300 text-xs opacity-70">Themes apply instantly.</div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
