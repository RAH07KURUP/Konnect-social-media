// Layout.jsx
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060519] via-[#0b1020] to-[#120922] text-gray-100">
      <div className="flex min-h-screen">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;
