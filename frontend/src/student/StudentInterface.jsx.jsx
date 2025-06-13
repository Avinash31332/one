import { useLocation, Link, Outlet } from "react-router-dom";
import { Home, Bus, HelpCircle, User } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", icon: <Home size={20} />, path: "/student" },
  { name: "All Buses", icon: <Bus size={20} />, path: "/student/buses" },
  { name: "Support", icon: <HelpCircle size={20} />, path: "/student/support" },
  { name: "Profile", icon: <User size={20} />, path: "/student/profile-page" },
];

export default function StudentInterface() {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const current = navItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    setActive(current?.name || "");
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-md">
        <div className="p-4 font-bold text-blue-700 text-xl border-b">
          Bus Driver Panel
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
                active === item.name
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        {/* Mobile bottom navbar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-sm transition ${
                active === item.name
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
