import { NavLink, useNavigate } from "react-router";
import type { SidebarConfig, DashboardRole } from "@/data/sidebar-config";
import { useDispatch } from "react-redux";
import { flushAuthState } from "@/store/slices/auth.slice";

type Props = {
  mainConfig: SidebarConfig[];
  bottomConfig: SidebarConfig[];
  role: DashboardRole;
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export const Sidebar: React.FC<Props> = ({
  mainConfig,
  bottomConfig,
  role,
  mobileOpen,
  onMobileClose,
  collapsed,
  setCollapsed,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = (item: SidebarConfig) => {
    if (item.href === "/logout") {
      dispatch(flushAuthState());
      navigate("/login");
    }
  };

  const isAdmin = role === "admin";

  const renderItem = (item: SidebarConfig) => (
    <div key={item.href + item.label}>
      {item.dividerBefore && (
        <div className="my-2 border-t border-gray-200" role="separator" />
      )}
      {item.href === "/logout" ? (
        <button
          type="button"
          onClick={() => handleItemClick(item)}
          className={
            collapsed
              ? "w-full flex items-center justify-center p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              : "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
          }
        >
          {item.icon}
          <span
            className={
              collapsed
                ? "lg:sr-only text-sm font-medium"
                : "text-sm font-medium"
            }
          >
            {item.label}
          </span>
        </button>
      ) : (
        <NavLink
          to={item.href}
          end={item.href === "/dashboard"}
          onClick={onMobileClose}
          className={({ isActive }) =>
            `${
              collapsed
                ? "w-full flex items-center justify-center p-2.5 rounded-lg"
                : "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
            } transition-colors ${
              isActive
                ? isAdmin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          {item.icon}
          <span
            className={
              collapsed
                ? "lg:sr-only text-sm font-medium"
                : "text-sm font-medium"
            }
          >
            {item.label}
          </span>
        </NavLink>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside
        className={`${
          isAdmin
            ? "bg-[#FFFFFF] lg:border-r border-gray-200"
            : "bg-white lg:border-r border-gray-200"
        } fixed inset-y-0 right-0 lg:left-0 z-50 flex flex-col h-full transition-all duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        } ${collapsed ? "lg:w-[72px]" : "lg:w-[260px]"} w-[260px]`}
      >
        <div className="flex flex-col p-3 gap-0.5 flex-1 min-h-0 overflow-auto pt-6">
          {mainConfig.map(renderItem)}
        </div>
        <div className="flex flex-col p-3 gap-0.5 shrink-0">
          {bottomConfig.map(renderItem)}
        </div>
      </aside>
    </>
  );
};
