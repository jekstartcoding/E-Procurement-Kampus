import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function VendorVerificationDetail() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"pending" | "verified" | "rejected">("pending");
  const [alasanPenolakan, setAlasanPenolakan] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const vendorData = {
    id: vendorId,
    nama: "PT. Teknologi Sejahtera",
    email: "contact@teknologisejahtera.com",
    telepon: "081234567890",
    alamat: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta",
    bidangUsaha: "Teknologi Informasi",
    tanggalDaftar: "2026-05-15",
    documents: [
      { name: "NIB", filename: "NIB_PT_Teknologi_Sejahtera.pdf", uploaded: true },
      { name: "NPWP", filename: "NPWP_PT_Teknologi_Sejahtera.pdf", uploaded: true },
      { name: "SIUP", filename: "SIUP_PT_Teknologi_Sejahtera.pdf", uploaded: true },
    ],
  };

  const handleVerify = () => {
    setStatus("verified");
    toast.success("Vendor berhasil diverifikasi!");
    setTimeout(() => {
      navigate("/admin/verifikasi-vendor");
    }, 1500);
  };

  const handleReject = () => {
    if (!alasanPenolakan.trim()) {
      toast.error("Alasan penolakan harus diisi");
      return;
    }

    setStatus("rejected");
    toast.success("Vendor ditolak");
    setTimeout(() => {
      navigate("/admin/verifikasi-vendor");
    }, 1500);
  };

  const handleDownload = (filename: string) => {
    toast.success(`Mengunduh ${filename}`);
  };

  return (
    <DashboardLayout role="admin" userName="Admin Pengadaan">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/verifikasi-vendor")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Verifikasi Vendor</h1>
            <p className="text-gray-600 mt-1">Tinjau dan verifikasi berkas vendor</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vendor Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Perusahaan</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">ID Vendor</label>
                  <p className="font-medium text-gray-900">{vendorData.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Nama Perusahaan</label>
                  <p className="font-medium text-gray-900">{vendorData.nama}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="font-medium text-gray-900">{vendorData.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Telepon</label>
                  <p className="font-medium text-gray-900">{vendorData.telepon}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600">Alamat</label>
                  <p className="font-medium text-gray-900">{vendorData.alamat}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Bidang Usaha</label>
                  <p className="font-medium text-gray-900">{vendorData.bidangUsaha}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tanggal Pendaftaran</label>
                  <p className="font-medium text-gray-900">
                    {new Date(vendorData.tanggalDaftar).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dokumen Persyaratan</h2>
              <div className="space-y-3">
                {vendorData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#1A56DB]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.filename}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc.filename)}
                      className="flex items-center gap-2 px-4 py-2 text-[#1A56DB] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Unduh</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Preview Area */}
              <div className="mt-6 p-8 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">
                  Pratinjau dokumen akan muncul di sini
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Klik tombol "Unduh" untuk melihat dokumen lengkap
                </p>
              </div>
            </div>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Verifikasi</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Ubah Status</label>
                  <select
                    value={status}
                    onChange={(e) => {
                      const newStatus = e.target.value as "pending" | "verified" | "rejected";
                      setStatus(newStatus);
                      setShowRejectForm(newStatus === "rejected");
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                  >
                    <option value="pending">Menunggu Verifikasi</option>
                    <option value="verified">Verifikasi</option>
                    <option value="rejected">Tolak Verifikasi</option>
                  </select>
                </div>

                {showRejectForm && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-900 mb-1">
                          Alasan Penolakan
                        </p>
                        <p className="text-xs text-red-700 mb-3">
                          Jelaskan alasan penolakan verifikasi vendor ini
                        </p>
                      </div>
                    </div>
                    <textarea
                      value={alasanPenolakan}
                      onChange={(e) => setAlasanPenolakan(e.target.value)}
                      rows={4}
                      placeholder="Contoh: Dokumen NPWP tidak valid atau sudah kedaluwarsa"
                      className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                )}

                {status === "verified" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          Vendor akan diverifikasi
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          Vendor dapat mengikuti tender setelah verifikasi
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi</h2>
              <div className="space-y-3">
                {status === "verified" && (
                  <button
                    onClick={handleVerify}
                    className="w-full py-3 bg-[#0E9F6E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Simpan & Verifikasi
                  </button>
                )}

                {status === "rejected" && (
                  <button
                    onClick={handleReject}
                    className="w-full py-3 bg-[#E02424] text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Simpan & Tolak
                  </button>
                )}

                {status === "pending" && (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Pilih Status Terlebih Dahulu
                  </button>
                )}

                <button
                  onClick={() => navigate("/admin/verifikasi-vendor")}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 mb-1">Perhatian</p>
                  <p className="text-xs text-yellow-700">
                    Pastikan semua dokumen sudah diperiksa dengan teliti sebelum melakukan verifikasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
