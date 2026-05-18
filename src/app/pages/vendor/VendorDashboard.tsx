import { DashboardLayout } from "../../components/DashboardLayout";
import { Package, Upload, Award, Bell, FileText } from "lucide-react";
import { Link } from "react-router";
import { StatusBadge } from "../../components/StatusBadge";

export default function VendorDashboard() {
  const stats = [
    {
      label: "Paket Tersedia",
      value: "12",
      icon: <Package className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      label: "Penawaran Dikirim",
      value: "8",
      icon: <Upload className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      label: "Menang Tender",
      value: "3",
      icon: <Award className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      label: "Notifikasi Baru",
      value: "5",
      icon: <Bell className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
  ];

  const activeTenders = [
    {
      id: "PKT001",
      nama: "Pengadaan Laptop",
      instansi: "Fakultas Teknik",
      batasWaktu: "2026-05-25",
      estimasi: "Rp 240.000.000",
      status: "active" as const,
    },
    {
      id: "PKT002",
      nama: "Peralatan Laboratorium",
      instansi: "Fakultas MIPA",
      batasWaktu: "2026-05-28",
      estimasi: "Rp 150.000.000",
      status: "active" as const,
    },
    {
      id: "PKT003",
      nama: "Kursi Kuliah",
      instansi: "Rektorat",
      batasWaktu: "2026-05-15",
      estimasi: "Rp 75.000.000",
      status: "expired" as const,
    },
  ];

  const getTimeRemaining = (deadline: string) => {
    const now = new Date("2026-05-18");
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return "Berakhir";
    if (days === 0) return "Hari ini";
    return `${days} hari lagi`;
  };

  return (
    <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Vendor</h1>
          <p className="text-gray-600 mt-1">Selamat datang kembali!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
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
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              to="/vendor/paket-lelang"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all"
            >
              <Package className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Lihat Paket Tersedia</span>
            </Link>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <Upload className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Upload Penawaran</span>
            </button>
            <Link
              to="/vendor/sanggahan/PKT001"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all"
            >
              <FileText className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Ajukan Sanggahan</span>
            </Link>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <Bell className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Notifikasi</span>
            </button>
          </div>
        </div>

        {/* Active Tenders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Paket Tender Aktif</h2>
            <Link
              to="/vendor/paket-lelang"
              className="text-sm text-[#1A56DB] hover:underline font-medium"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {activeTenders.map((tender) => (
              <div key={tender.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{tender.nama}</h3>
                      <StatusBadge variant={tender.status}>
                        {tender.status === "active" ? "Aktif" : "Berakhir"}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tender.instansi}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        Batas: {new Date(tender.batasWaktu).toLocaleDateString("id-ID")}
                      </span>
                      <span className={`font-medium ${
                        tender.status === "expired" ? "text-red-600" : "text-[#1A56DB]"
                      }`}>
                        {getTimeRemaining(tender.batasWaktu)}
                      </span>
                      <span className="font-medium text-gray-900">{tender.estimasi}</span>
                    </div>
                  </div>
                  <Link
                    to={`/vendor/paket-lelang/${tender.id}`}
                    className="px-4 py-2 bg-[#1A56DB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
