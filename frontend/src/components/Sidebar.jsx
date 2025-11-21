import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HeartHandshake, HomeIcon, UsersIcon } from "lucide-react";

/**
 * Sidebar - theme-aware (uses bg-base-100 / border-base-300 classes)
 * Uses HeartHandshake icon for the brand
 */

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen sticky top-0 bg-base-100 border-r border-base-300 p-4">
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <HeartHandshake className="w-5 h-5" />
          </div>

          <div>
            <div className="text-lg font-bold text-base-content">Konnect</div>
            <div className="text-xs opacity-60">A modern space to connect</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem to="/" label="Home" icon={<HomeIcon />} active={currentPath === "/"} />
        <NavItem to="/friends" label="Friends" icon={<UsersIcon />} active={currentPath === "/friends"} />
        <NavItem to="/notifications" label="Notifications" icon={<BellIcon />} active={currentPath === "/notifications"} />
      </nav>

      <div className="mt-auto pt-4 border-t border-base-300">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
            <img src={authUser?.profilePic} alt="user" />
          </div>
          <div>
            <div className="font-semibold text-sm text-base-content">{authUser?.fullName}</div>
            <div className="text-xs text-success">Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

function NavItem({ to, label, icon, active }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${active ? "bg-primary/10 text-primary" : "text-base-content hover:bg-base-200"}`}>
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default Sidebar;
