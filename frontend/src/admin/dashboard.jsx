import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HomeIcon,
  UserPlusIcon,
  CogIcon,
  CreditCardIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [active, setActive] = useState("home");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth <= 700;
      setIsSmallScreen(small);
      if (!small) setSidebarOpen(true); // Always show on large screens
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    // { name: "Home", icon: HomeIcon, key: "home", path: "/admin/dashboard" },
    {
      name: "Manage Data",
      icon: UserPlusIcon,
      key: "create",
      path: "/admin/dashboard/manage-data",
    },
    {
      name: "Settings",
      icon: CogIcon,
      key: "settings",
      path: "/admin/settings",
    },
    {
      name: "Billing",
      icon: CreditCardIcon,
      key: "billing",
      path: "/admin/dashboard/billing",
    },
    {
      name: "Profile",
      icon: UserCircleIcon,
      key: "profile",
      path: "/admin/dashboard/profile",
    },
  ];

  const styles = {
    mainShaodw: {
      boxShadow: "0px 10px 10px black",
    },
  };

  return (
    <div
      className={`${styles.mainShaodw} flex min-h-screen bg-gray-50 relative`}
    >
      {/* Toggle button for mobile */}
      {isSmallScreen && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-50 text-gray-700 cursor-pointer"
        >
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      )}

      {/* Sidebar */}
      {(sidebarOpen || !isSmallScreen) && (
        <aside
          className={`${
            isSmallScreen ? "fixed z-40" : "relative"
          } w-64 bg-white shadow-lg p-6 h-full`}
        >
          <h1 className="text-2xl font-bold text-blue-700 mb-8">
            Admin Dashboard
          </h1>
          <nav className="space-y-4">
            {menuItems.map(({ name, icon: Icon, key, path }) => (
              <Link
                key={key}
                to={path}
                onClick={() => {
                  setActive(key);
                  if (isSmallScreen) setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  active === key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 p-8 ${isSmallScreen ? "pt-16" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}
