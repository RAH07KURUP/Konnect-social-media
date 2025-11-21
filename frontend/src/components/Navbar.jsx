import { Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HeartHandshake, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-40 bg-[#050615]/80 border-b border-[#2a1a49] backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-3">
            <HeartHandshake/>
            <span className="hidden sm:inline text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#ff4d9d]">Konnect</span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <Link to="/notifications">
              <button className="p-2 rounded-full hover:bg-white/5 transition shadow-neon" title="Notifications">
                <BellIcon className="w-5 h-5 text-sky-300" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="flex items-center gap-3 ml-2">
              <div className="w-9 h-9 rounded-full ring-2 ring-[#7c3aed]/30 overflow-hidden">
                <img src={authUser?.profilePic} alt="avatar" />
              </div>

              <button onClick={logoutMutation} className="p-2 rounded-full hover:bg-white/5 transition" title="Logout">
                <LogOutIcon className="w-5 h-5 text-rose-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
