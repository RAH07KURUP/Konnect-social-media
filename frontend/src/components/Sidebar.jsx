import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HeartHandshake, HomeIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();
  const currentPath = pathname;

  return (
    <aside className="w-72 hidden lg:flex flex-col h-screen sticky top-0 bg-[#06061a] border-r border-[#2a1240] p-4">
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center rounded-xl" style={{background: "linear-gradient(135deg,#7c3aed,#ff4d9d)"}}>
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="text-lg font-bold text-white">Konnect</div>
            <div className="text-xs text-gray-400">A modern space to connect</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-3">
        <NavItem to="/" label="Home" icon={<HomeIcon />} active={currentPath === "/"} />
        <NavItem to="/friends" label="Friends" icon={<UsersIcon />} active={currentPath === "/friends"} />
        <NavItem to="/notifications" label="Notifications" icon={<BellIcon />} active={currentPath === "/notifications"} />
      </nav>

      <div className="mt-auto pt-4 border-t border-[#1a0e2d]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#ff4d9d]/20">
            <img src={authUser?.profilePic} alt="user" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{authUser?.fullName}</div>
            <div className="text-xs text-emerald-400">Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

function NavItem({ to, label, icon, active }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active ? "bg-gradient-to-r from-[#7c3aed]/20 to-[#ff4d9d]/18 text-white ring-1 ring-[#7c3aed]/20" : "text-gray-200 hover:bg-white/3"}`}>
      <div className="w-6 h-6 flex items-center justify-center text-sky-300">{icon}</div>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default Sidebar;
