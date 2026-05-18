import { DashboardLayout } from "../../components/DashboardLayout";
import { Package, ClipboardCheck, Award, FileText } from "lucide-react";
import { Link } from "react-router";
import { StatusBadge } from "../../components/StatusBadge";

export default function PanitiaDashboard() {
  const stats = [
    {
      label: "Total Paket Lelang",
      value: "15",
      icon: <Package className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      label: "Menunggu Evaluasi",
      value: "4",
      icon: <ClipboardCheck className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      label: "Selesai Evaluasi",
      value: "8",
      icon: <Award className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      label: "Dalam Proses",
      value: "3",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-purple-500",
    },
  ];

  const paketEvaluasi = [
    {
      id: "PKT001",
      nama: "Pengadaan Laptop",
      instansi: "Fakultas Teknik",
      jumlahPenawaran: 5,
      status: "pending" as const,
      deadline: "2026-05-20",
    },
    {
      id: "PKT002",
      nama: "Peralatan Laboratorium",
      instansi: "Fakultas MIPA",
      jumlahPenawaran: 3,
      status: "success" as const,
      deadline: "2026-05-15",
    },
    {
      id: "PKT004",
      nama: "Proyektor",
      instansi: "Fakultas Ekonomi",
      jumlahPenawaran: 6,
      status: "pending" as const,
      deadline: "2026-05-22",
    },
  ];

  return (
    <DashboardLayout role="panitia" userName="Panitia Pengadaan">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Panitia</h1>
          <p className="text-gray-600 mt-1">Kelola evaluasi dan penetapan pemenang tender</p>
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
          <div className="grid md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <Package className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Paket Lelang</span>
            </button>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <ClipboardCheck className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Evaluasi Vendor</span>
            </button>
            <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1A56DB] hover:bg-blue-50 transition-all">
              <FileText className="w-5 h-5 text-[#1A56DB]" />
              <span className="font-medium text-gray-900">Laporan</span>
            </button>
          </div>
        </div>

        {/* Paket yang Perlu Evaluasi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Paket yang Perlu Evaluasi</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {paketEvaluasi.map((paket) => (
              <div key={paket.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{paket.nama}</h3>
                      <StatusBadge variant={paket.status}>
                        {paket.status === "pending" ? "Perlu Evaluasi" : "Selesai"}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{paket.instansi}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        {paket.jumlahPenawaran} Penawaran Masuk
                      </span>
                      <span className="text-gray-600">
                        Deadline: {new Date(paket.deadline).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/panitia/evaluasi/${paket.id}`}
                    className="px-4 py-2 bg-[#1A56DB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
                  >
                    {paket.status === "pending" ? "Mulai Evaluasi" : "Lihat Hasil"}
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
