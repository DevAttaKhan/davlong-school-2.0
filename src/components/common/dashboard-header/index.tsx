import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  Calendar,
  Bell,
  User,
  Home,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Logo from "@/assets/images/logo.png";
import type { RootState } from "@/store/store";
import type { DashboardRole } from "@/data/sidebar-config";

type DashboardHeaderProps = {
  role: DashboardRole;
  onMenuClick?: () => void;
  collapsed?: boolean;
  onToggleSidebar?: () => void;
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  role,
  onMenuClick,
  collapsed,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const notificationCount = useSelector(
    (state: RootState) => state.ui.notificationCount ?? 0
  );

  if (role === "admin") {
    return (
      <header className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 min-w-0">
          {/* Sidebar Toggle (Desktop) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>

          <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Calendar"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-red-500 text-white text-xs font-medium rounded-full">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Profile"
          >
            <User className="w-5 h-5" />
          </button>
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={onMenuClick}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 shrink-0 lg:hidden"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>
    );
  }

  // User dashboard header: dark blue bar, logo, bell, Home, Log Out
  return (
    <header className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-[#2563EB]">
      <div className="flex items-center gap-3 min-w-0">
        {/* Sidebar Toggle (Desktop) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-transparent">
          <img
            src={Logo}
            alt="Dave Long Coach Travel"
            className="w-10 h-10 object-contain brightness-0 invert"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          className="relative p-2 rounded-full text-white/90 hover:text-white bg-white/10 hover:bg-white/10 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-red-500 text-white text-xs font-medium rounded-full">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/90 text-sm font-medium transition-colors"
        >
          <Home className="w-4 h-4 shrink-0" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-white/90 hover:bg-white/10 shrink-0 lg:hidden"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
