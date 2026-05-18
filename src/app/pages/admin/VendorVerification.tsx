import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { StatusBadge } from "../../components/StatusBadge";
import { Search, Eye, Calendar } from "lucide-react";
import { Link } from "react-router";

interface Vendor {
  id: string;
  nama: string;
  email: string;
  bidangUsaha: string;
  tanggalDaftar: string;
  status: "pending" | "verified" | "rejected";
}

export default function VendorVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const vendors: Vendor[] = [
    {
      id: "V001",
      nama: "PT. Teknologi Sejahtera",
      email: "contact@teknologisejahtera.com",
      bidangUsaha: "Teknologi Informasi",
      tanggalDaftar: "2026-05-15",
      status: "pending",
    },
    {
      id: "V002",
      nama: "CV. Maju Jaya",
      email: "info@majujaya.com",
      bidangUsaha: "Konstruksi",
      tanggalDaftar: "2026-05-14",
      status: "pending",
    },
    {
      id: "V003",
      nama: "PT. Sinar Abadi",
      email: "cs@sinarabadi.com",
      bidangUsaha: "Alat Tulis Kantor",
      tanggalDaftar: "2026-05-13",
      status: "verified",
    },
    {
      id: "V004",
      nama: "PT. Karya Mandiri",
      email: "hello@karyamandiri.com",
      bidangUsaha: "Furnitur",
      tanggalDaftar: "2026-05-12",
      status: "rejected",
    },
    {
      id: "V005",
      nama: "CV. Digital Solutions",
      email: "support@digitalsol.com",
      bidangUsaha: "Teknologi Informasi",
      tanggalDaftar: "2026-05-11",
      status: "pending",
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || vendor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu Verifikasi";
      case "verified":
        return "Terverifikasi";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout role="admin" userName="Admin Pengadaan">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verifikasi Vendor</h1>
          <p className="text-gray-600 mt-1">Tinjau dan verifikasi pendaftaran vendor baru</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari vendor..."
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
              <option value="pending">Menunggu Verifikasi</option>
              <option value="verified">Terverifikasi</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID Vendor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nama Perusahaan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bidang Usaha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tanggal Daftar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{vendor.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{vendor.nama}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{vendor.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{vendor.bidangUsaha}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(vendor.tanggalDaftar).toLocaleDateString("id-ID")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        variant={
                          vendor.status === "pending"
                            ? "pending"
                            : vendor.status === "verified"
                            ? "success"
                            : "danger"
                        }
                      >
                        {getStatusText(vendor.status)}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/admin/verifikasi-vendor/${vendor.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#1A56DB] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Tinjau
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada vendor ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
