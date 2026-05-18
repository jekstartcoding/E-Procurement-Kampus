import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { Search, Clock, Calendar } from "lucide-react";
import { Link } from "react-router";

interface Paket {
  id: string;
  nama: string;
  instansi: string;
  kategori: string;
  estimasi: number;
  batasWaktu: string;
  status: "active" | "expired";
}

export default function PaketLelangList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const paketList: Paket[] = [
    {
      id: "PKT001",
      nama: "Pengadaan Laptop",
      instansi: "Fakultas Teknik",
      kategori: "Teknologi Informasi",
      estimasi: 240000000,
      batasWaktu: "2026-05-25",
      status: "active",
    },
    {
      id: "PKT002",
      nama: "Peralatan Laboratorium",
      instansi: "Fakultas MIPA",
      kategori: "Peralatan Lab",
      estimasi: 150000000,
      batasWaktu: "2026-05-28",
      status: "active",
    },
    {
      id: "PKT003",
      nama: "Kursi Kuliah",
      instansi: "Rektorat",
      kategori: "Furnitur",
      estimasi: 75000000,
      batasWaktu: "2026-05-15",
      status: "expired",
    },
    {
      id: "PKT004",
      nama: "Proyektor",
      instansi: "Fakultas Ekonomi",
      kategori: "Teknologi Informasi",
      estimasi: 85000000,
      batasWaktu: "2026-05-30",
      status: "active",
    },
  ];

  const getTimeRemaining = (deadline: string) => {
    const now = new Date("2026-05-18");
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days < 0) return { text: "Berakhir", color: "text-red-600" };
    if (days === 0) return { text: `${hours} jam lagi`, color: "text-red-600" };
    if (days <= 3) return { text: `${days} hari lagi`, color: "text-yellow-600" };
    return { text: `${days} hari lagi`, color: "text-green-600" };
  };

  const filteredPaket = paketList.filter((paket) => {
    const matchesSearch =
      paket.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paket.instansi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || paket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paket Lelang Tersedia</h1>
          <p className="text-gray-600 mt-1">Daftar paket tender yang dapat Anda ikuti</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari paket tender..."
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
              <option value="active">Aktif</option>
              <option value="expired">Berakhir</option>
            </select>
          </div>
        </div>

        {/* Paket Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPaket.map((paket) => {
            const timeRemaining = getTimeRemaining(paket.batasWaktu);
            return (
              <div
                key={paket.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{paket.nama}</h3>
                      <p className="text-sm text-gray-600">{paket.instansi}</p>
                    </div>
                    <StatusBadge variant={paket.status}>
                      {paket.status === "active" ? "Aktif" : "Berakhir"}
                    </StatusBadge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Kategori:</span>
                      <span className="font-medium text-gray-900">{paket.kategori}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Estimasi Nilai:</span>
                      <span className="font-bold text-[#1A56DB]">
                        Rp {paket.estimasi.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Batas Upload:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(paket.batasWaktu).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Sisa Waktu:</span>
                      <span className={`font-bold ${timeRemaining.color}`}>
                        {timeRemaining.text}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/vendor/paket-lelang/${paket.id}`}
                      className="flex-1 text-center px-4 py-2 border border-[#1A56DB] text-[#1A56DB] rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Lihat Detail
                    </Link>
                    {paket.status === "active" ? (
                      <Link
                        to={`/vendor/upload-penawaran/${paket.id}`}
                        className="flex-1 text-center px-4 py-2 bg-[#1A56DB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
                      >
                        Upload Penawaran
                      </Link>
                    ) : (
                      <Link
                        to={`/vendor/sanggahan/${paket.id}`}
                        className="flex-1 text-center px-4 py-2 bg-[#E02424] text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Ajukan Sanggahan
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPaket.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <p className="text-gray-500">Tidak ada paket tender ditemukan</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
