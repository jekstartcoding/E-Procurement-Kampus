import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Home,
  FileCheck,
  FileText,
  Package,
  Upload,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  ClipboardList,
  BarChart3
} from "lucide-react";

interface MenuItem {
  label: string;
  path: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: "admin" | "vendor" | "unit" | "panitia";
  userName: string;
}

const menuConfig: Record<string, MenuItem[]> = {
  admin: [
    { label: "Dashboard", path: "/admin", icon: <Home className="w-5 h-5" /> },
    { label: "Verifikasi Vendor", path: "/admin/verifikasi-vendor", icon: <FileCheck className="w-5 h-5" /> },
    { label: "Audit Log", path: "/admin/audit-log", icon: <Shield className="w-5 h-5" /> },
  ],
  vendor: [
    { label: "Dashboard", path: "/vendor", icon: <Home className="w-5 h-5" /> },
    { label: "Paket Lelang Tersedia", path: "/vendor/paket-lelang", icon: <Package className="w-5 h-5" /> },
    { label: "Upload Penawaran", path: "/vendor/upload-penawaran", icon: <Upload className="w-5 h-5" /> },
    { label: "Notifikasi", path: "/vendor/notifikasi", icon: <Bell className="w-5 h-5" /> },
  ],
  unit: [
    { label: "Dashboard", path: "/unit", icon: <Home className="w-5 h-5" /> },
    { label: "Formulir Pengajuan Baru", path: "/unit/pengajuan-baru", icon: <FileText className="w-5 h-5" /> },
    { label: "Pengajuan Saya", path: "/unit/pengajuan-saya", icon: <ClipboardList className="w-5 h-5" /> },
  ],
  panitia: [
    { label: "Dashboard", path: "/panitia", icon: <Home className="w-5 h-5" /> },
    { label: "Paket Lelang", path: "/panitia/paket-lelang", icon: <Package className="w-5 h-5" /> },
    { label: "Evaluasi & Penetapan", path: "/panitia/evaluasi", icon: <BarChart3 className="w-5 h-5" /> },
  ],
};

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = menuConfig[role] || [];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-semibold text-[#1A56DB]">E-Procurement Kampus</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-[#1A56DB] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-20 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#1A56DB] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Keluar</span>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="pt-16 lg:pl-64">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
