import { DashboardLayout } from "../../components/DashboardLayout";
import { Users, FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { StatusBadge } from "../../components/StatusBadge";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Vendor Terdaftar",
      value: "156",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
      change: "+12 bulan ini",
    },
    {
      label: "Menunggu Verifikasi",
      value: "8",
      icon: <FileCheck className="w-6 h-6" />,
      color: "bg-yellow-500",
      change: "Perlu ditinjau",
    },
    {
      label: "Vendor Terverifikasi",
      value: "142",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-green-500",
      change: "+5 minggu ini",
    },
    {
      label: "Tender Aktif",
      value: "24",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-500",
      change: "12 akan ditutup",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      vendor: "PT. Teknologi Sejahtera",
      action: "Pendaftaran baru",
      time: "2 jam yang lalu",
      status: "pending" as const,
    },
    {
      id: 2,
      vendor: "CV. Maju Jaya",
      action: "Dokumen diverifikasi",
      time: "5 jam yang lalu",
      status: "success" as const,
    },
    {
      id: 3,
      vendor: "PT. Sinar Abadi",
      action: "Verifikasi ditolak",
      time: "1 hari yang lalu",
      status: "danger" as const,
    },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin Pengadaan">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-1">Selamat datang di sistem E-Procurement</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/admin/verifikasi-vendor"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all"
            >
              <FileCheck className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Verifikasi Vendor</span>
            </Link>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <Users className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Kelola Vendor</span>
            </button>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <TrendingUp className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Laporan</span>
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.vendor}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{activity.time}</span>
                  <StatusBadge variant={activity.status}>
                    {activity.status === "pending" && "Pending"}
                    {activity.status === "success" && "Terverifikasi"}
                    {activity.status === "danger" && "Ditolak"}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
