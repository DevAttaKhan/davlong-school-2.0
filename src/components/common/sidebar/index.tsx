import { NavLink, useNavigate } from "react-router";
import type { SidebarConfig, DashboardRole } from "@/data/sidebar-config";
import { useDispatch } from "react-redux";
import { flushAuthState } from "@/store/slices/auth.slice";

type Props = {
  config: SidebarConfig[];
  role: DashboardRole;
};

export const Sidebar: React.FC<Props> = ({ config, role }) => {
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
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-200 transition-colors"
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ) : (
        <NavLink
          to={item.href}
          end={item.href === "/dashboard"}
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              isActive
                ? isAdmin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-200"
            }`
          }
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </NavLink>
      )}
    </div>
  );

  const adminBottomIndex = isAdmin
    ? config.findIndex((item) => item.dividerBefore)
    : -1;
  const adminMainItems =
    adminBottomIndex >= 0 ? config.slice(0, adminBottomIndex) : config;
  const adminBottomItems =
    adminBottomIndex >= 0 ? config.slice(adminBottomIndex) : [];

  return (
    <aside
      className={
        isAdmin
          ? "w-[260px] min-h-full bg-[#FFFFFF] border-r border-gray-200 flex flex-col"
          : "w-[260px] min-h-full bg-white border-r border-gray-200 flex flex-col"
      }
    >
      {isAdmin ? (
        <>
          <nav className="flex flex-col p-3 gap-0.5 flex-1 min-h-0 overflow-auto">
            {adminMainItems.map(renderItem)}
          </nav>
          <div className="flex flex-col p-3 gap-0.5 shrink-0">
            {adminBottomItems.map(renderItem)}
          </div>
        </>
      ) : (
        <nav className="flex flex-col p-3 gap-0.5">
          {config.map(renderItem)}
        </nav>
      )}
    </aside>
  );
};
