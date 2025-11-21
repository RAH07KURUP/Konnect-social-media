import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="
          dropdown-content mt-3 shadow-xl rounded-xl w-56 p-2
          bg-base-200 border border-base-300
        "
      >
        <div className="space-y-1">
          {THEMES.map(t => (
            <button
              key={t.name}
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 
                transition-colors
                ${theme === t.name ? "bg-primary/20 text-primary" : "hover:bg-base-300"}
              `}
              onClick={() => setTheme(t.name)}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{t.label}</span>

              <div className="ml-auto flex gap-1">
                {t.colors.map((c, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
