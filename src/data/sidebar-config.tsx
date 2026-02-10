import {
  FileText,
  Calendar,
  Users,
  FileCheck,
  Mail,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export interface SidebarConfig {
  label: string;
  icon: React.ReactNode;
  href: string;
  /** When true, render a divider above this item */
  dividerBefore?: boolean;
}

const AdminSidebarConfig: SidebarConfig[] = [
  {
    label: "Quotations",
    icon: <FileText className="w-5 h-5" />,
    href: "/dashboard/quotations",
  },
  {
    label: "Calendar",
    icon: <Calendar className="w-5 h-5" />,
    href: "/dashboard/calendar",
  },
  {
    label: "Users",
    icon: <Users className="w-5 h-5" />,
    href: "/dashboard/users",
  },
  {
    label: "Complete Transactions",
    icon: <FileCheck className="w-5 h-5" />,
    href: "/dashboard/transactions",
  },
  {
    label: "Email Templates",
    icon: <Mail className="w-5 h-5" />,
    href: "/dashboard/email-templates",
  },
];

const AdminBottomSidebarConfig: SidebarConfig[] = [
  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    href: "/dashboard/settings",
    dividerBefore: true,
  },
  {
    label: "Sign out",
    icon: <LogOut className="w-5 h-5" />,
    href: "/logout",
    dividerBefore: false,
  },
];

const UserSidebarConfig: SidebarConfig[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    href: "/dashboard/settings",
  },
];

const UserBottomSidebarConfig: SidebarConfig[] = [
  {
    label: "Sign out",
    icon: <LogOut className="w-5 h-5" />,
    href: "/logout",
    dividerBefore: true,
  },
];

export type DashboardRole = "admin" | "user";

export const getSidebarConfig = (role: DashboardRole) => {
  return role === "admin"
    ? { main: AdminSidebarConfig, bottom: AdminBottomSidebarConfig }
    : { main: UserSidebarConfig, bottom: UserBottomSidebarConfig };
};
