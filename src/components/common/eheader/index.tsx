import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  Search,
  Calendar,
  Bell,
  User,
  Home,
  LogOut,
} from "lucide-react";
import Logo from "@/assets/images/logo.png";
import type { RootState } from "@/store/store";
import { flushAuthState } from "@/store/slices/auth.slice";
import type { DashboardRole } from "@/data/sidebar-config";

type EHeaderProps = {
  role: DashboardRole;
};

export const EHeader: React.FC<EHeaderProps> = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notificationCount = useSelector(
    (state: RootState) => state.ui.notificationCount ?? 0
  );

  const handleLogout = () => {
    dispatch(flushAuthState());
    navigate("/login");
  };

  if (role === "admin") {
    return (
      <header className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 min-w-0">
          {/* <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 shrink-0"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button> */}
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            Admin Dashboard
          </h1>
        </div>

        {/* <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search Trips"
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div> */}

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
        </div>
      </header>
    );
  }

  // User dashboard header: dark blue bar, logo, search, bell, Home, Log Out
  return (
    <header className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-[#2563EB]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-transparent">
          <img
            src={Logo}
            alt="Dave Long Coach Travel"
            className="w-10 h-10 object-contain brightness-0 invert"
          />
        </div>
        {/* <div className="flex-1 max-w-xs hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search Trips"
              className="w-full pl-9 pr-4 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div> */}
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
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/90 text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </header>
  );
};
