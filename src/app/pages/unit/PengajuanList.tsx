import { DashboardLayout } from "../../components/DashboardLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { Search, Filter, Calendar, Eye } from "lucide-react";
import { useState } from "react";

interface Pengajuan {
  id: string;
  nama: string;
  jumlahItem: number;
  totalBiaya: number;
  tanggal: string;
  status: "pending" | "approved" | "rejected";
}

export default function PengajuanList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const pengajuanList: Pengajuan[] = [
    {
      id: "PGJ001",
      nama: "Pengadaan Laptop",
      jumlahItem: 20,
      totalBiaya: 240000000,
      tanggal: "2026-05-15",
      status: "pending",
    },
    {
      id: "PGJ002",
      nama: "Peralatan Laboratorium",
      jumlahItem: 15,
      totalBiaya: 150000000,
      tanggal: "2026-05-12",
      status: "approved",
    },
    {
      id: "PGJ003",
      nama: "Kursi Kuliah",
      jumlahItem: 100,
      totalBiaya: 75000000,
      tanggal: "2026-05-10",
      status: "approved",
    },
    {
      id: "PGJ004",
      nama: "Proyektor",
      jumlahItem: 10,
      totalBiaya: 85000000,
      tanggal: "2026-05-08",
      status: "rejected",
    },
  ];

  const filteredPengajuan = pengajuanList.filter((item) => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout role="unit" userName="Unit Pengusul">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengajuan Saya</h1>
          <p className="text-gray-600 mt-1">Daftar semua pengajuan yang telah diajukan</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pengajuan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Pengajuan Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    ID Pengajuan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Nama Pengajuan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Jumlah Item
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Total Biaya
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPengajuan.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.jumlahItem}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Rp {item.totalBiaya.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.tanggal).toLocaleDateString("id-ID")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        variant={
                          item.status === "pending"
                            ? "pending"
                            : item.status === "approved"
                            ? "success"
                            : "danger"
                        }
                      >
                        {item.status === "pending" && "Menunggu"}
                        {item.status === "approved" && "Disetujui"}
                        {item.status === "rejected" && "Ditolak"}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#1A56DB] hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPengajuan.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada pengajuan ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
