import { DashboardLayout } from "../../components/DashboardLayout";
import { FileText, CheckCircle, Clock, XCircle, Plus } from "lucide-react";
import { Link } from "react-router";
import { StatusBadge } from "../../components/StatusBadge";

export default function UnitPengusulDashboard() {
  const stats = [
    {
      label: "Total Pengajuan",
      value: "24",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      label: "Disetujui",
      value: "18",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      label: "Menunggu",
      value: "4",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      label: "Ditolak",
      value: "2",
      icon: <XCircle className="w-6 h-6" />,
      color: "bg-red-500",
    },
  ];

  const recentSubmissions = [
    {
      id: "PGJ001",
      nama: "Pengadaan Laptop",
      jumlah: 20,
      estimasi: "Rp 240.000.000",
      tanggal: "2026-05-15",
      status: "pending" as const,
    },
    {
      id: "PGJ002",
      nama: "Peralatan Laboratorium",
      jumlah: 1,
      estimasi: "Rp 150.000.000",
      tanggal: "2026-05-12",
      status: "success" as const,
    },
    {
      id: "PGJ003",
      nama: "Kursi Kuliah",
      jumlah: 100,
      estimasi: "Rp 75.000.000",
      tanggal: "2026-05-10",
      status: "success" as const,
    },
  ];

  return (
    <DashboardLayout role="unit" userName="Unit Pengusul">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Unit Pengusul</h1>
            <p className="text-gray-600 mt-1">Kelola pengajuan kebutuhan barang dan jasa</p>
          </div>
          <Link
            to="/unit/pengajuan-baru"
            className="flex items-center gap-2 px-6 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Pengajuan Baru
          </Link>
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

        {/* Budget Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pagu Anggaran</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Pagu Anggaran Tahun 2026:</span>
              <span className="text-xl font-bold text-gray-900">Rp 2.500.000.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sudah Digunakan:</span>
              <span className="text-lg font-semibold text-[#E02424]">Rp 1.200.000.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sisa Pagu:</span>
              <span className="text-lg font-semibold text-[#0E9F6E]">Rp 1.300.000.000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-[#1A56DB] h-3 rounded-full" style={{ width: "48%" }}></div>
            </div>
            <p className="text-sm text-gray-500 text-center">48% dari total pagu telah digunakan</p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Pengajuan Terbaru</h2>
            <Link
              to="/unit/pengajuan-saya"
              className="text-sm text-[#1A56DB] hover:underline font-medium"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Nama Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Estimasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSubmissions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.jumlah}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.estimasi}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge variant={item.status}>
                        {item.status === "pending" && "Menunggu"}
                        {item.status === "success" && "Disetujui"}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
