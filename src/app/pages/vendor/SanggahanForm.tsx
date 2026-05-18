import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, AlertCircle, Clock, CheckCircle, FileText } from "lucide-react";
import { toast } from "sonner";

export default function SanggahanForm() {
  const { paketId } = useParams();
  const navigate = useNavigate();

  const [argumen, setArgumen] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

interface SanggahPaketInfo {
  nama: string;
  instansi: string;
  pemenang: string;
  batasSanggah: string;
}

  const allPaket: Record<string, SanggahPaketInfo> = {
    PKT001: { nama: "Pengadaan Laptop", instansi: "Fakultas Teknik", pemenang: "PT. Sinar Abadi", batasSanggah: "2026-05-28 23:59:59" },
    PKT002: { nama: "Peralatan Laboratorium", instansi: "Fakultas MIPA", pemenang: "PT. Multi Sarana", batasSanggah: "2026-05-30 23:59:59" },
    PKT003: { nama: "Kursi Kuliah", instansi: "Rektorat", pemenang: "PT. Furnitur Indah", batasSanggah: "2026-05-15 23:59:59" },
    PKT004: { nama: "Proyektor", instansi: "Fakultas Ekonomi", pemenang: "PT. Visual Media", batasSanggah: "2026-06-02 23:59:59" },
  };

  const baseData = paketId && allPaket[paketId] ? allPaket[paketId] : allPaket["PKT001"];
  const paketData = {
    id: paketId || "PKT001",
    ...baseData,
  };

  const getTimeRemaining = () => {
    const now = new Date("2026-05-18 10:00:00");
    const end = new Date(paketData.batasSanggah);
    const diff = end.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { days, hours, isExpired: diff < 0 };
  };

  const timeRemaining = getTimeRemaining();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!argumen.trim()) {
      toast.error("Argumen sanggahan wajib diisi");
      return;
    }

    if (argumen.trim().length < 50) {
      toast.error("Argumen sanggahan minimal 50 karakter");
      return;
    }

    setSubmitted(true);
    toast.success("Sanggahan berhasil dikirim!");
  };

  if (submitted) {
    return (
      <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sanggahan Berhasil Dikirim!</h2>
            <p className="text-gray-600 mb-8">
              Terima kasih. Sanggahan Anda telah diterima dan akan ditinjau oleh panitia dalam 3-5 hari kerja.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Detail Sanggahan</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Referensi:</span>
                  <span className="font-mono font-bold text-gray-900">SNG-{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paket Tender:</span>
                  <span className="font-medium text-gray-900">{paketData.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal Kirim:</span>
                  <span className="font-medium text-gray-900">
                    {new Date().toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-gray-600 block mb-2">Argumen:</span>
                  <p className="text-gray-900 text-sm">{argumen}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/vendor")}
              className="px-8 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (timeRemaining.isExpired) {
    return (
      <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Masa Sanggah Telah Berakhir</h2>
            <p className="text-gray-600 mb-8">
              Batas waktu pengajuan sanggahan untuk paket tender ini sudah lewat.
            </p>

            <button
              onClick={() => navigate("/vendor")}
              className="px-6 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/vendor")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Formulir Sanggahan</h1>
            <p className="text-gray-600 mt-1">Ajukan keberatan terhadap hasil evaluasi</p>
          </div>
        </div>

        {/* Timer Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2">Masa Sanggah Terbatas</h3>
              <p className="text-sm text-yellow-800 mb-3">
                Batas waktu sanggahan: <span className="font-bold">{new Date(paketData.batasSanggah).toLocaleString("id-ID")}</span>
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-lg px-4 py-2">
                  <p className="text-2xl font-bold text-yellow-600">{timeRemaining.days}</p>
                  <p className="text-xs text-gray-600">Hari</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-2">
                  <p className="text-2xl font-bold text-yellow-600">{timeRemaining.hours}</p>
                  <p className="text-xs text-gray-600">Jam</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Paket */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Paket Tender</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">ID Paket</label>
              <p className="font-medium text-gray-900">{paketData.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Nama Paket</label>
              <p className="font-medium text-gray-900">{paketData.nama}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Instansi</label>
              <p className="font-medium text-gray-900">{paketData.instansi}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Pemenang</label>
              <p className="font-medium text-gray-900">{paketData.pemenang}</p>
            </div>
          </div>
        </div>

        {/* Form Sanggahan */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Argumen Sanggahan *</h2>

          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Petunjuk Pengisian
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Jelaskan secara detail alasan keberatan Anda</li>
                    <li>• Sertakan bukti atau data pendukung jika ada</li>
                    <li>• Gunakan bahasa yang sopan dan profesional</li>
                    <li>• Minimal 50 karakter</li>
                  </ul>
                </div>
              </div>
            </div>

            <textarea
              value={argumen}
              onChange={(e) => setArgumen(e.target.value)}
              rows={10}
              placeholder="Contoh: Kami keberatan dengan hasil evaluasi karena dokumen teknis yang kami ajukan telah memenuhi semua persyaratan yang tertera dalam RKS. Berdasarkan spesifikasi yang kami tawarkan..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent ${
                (hasSubmitted && !argumen.trim()) || (argumen && argumen.length < 50)
                  ? "border-red-500 ring-2 ring-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            <div className="flex items-center justify-between mt-2">
              <p className={`text-sm ${
                argumen.length < 50 ? "text-red-600" : "text-gray-500"
              }`}>
                {argumen.length} / minimal 50 karakter
              </p>
              {argumen.length >= 50 && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>

            {hasSubmitted && !argumen.trim() && (
              <p className="text-sm text-red-600 mt-2 font-medium">
                * Field Argumen Sanggahan wajib diisi (mandatory)
              </p>
            )}

            {argumen && argumen.length < 50 && (
              <p className="text-sm text-red-600 mt-2 font-medium">
                * Argumen sanggahan minimal 50 karakter
              </p>
            )}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">
                  Peringatan Penting
                </p>
                <p className="text-xs text-red-700">
                  Pastikan argumen yang Anda sampaikan akurat dan didukung bukti yang kuat.
                  Sanggahan yang tidak berdasar dapat mempengaruhi reputasi vendor Anda di sistem.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/vendor")}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#E02424] text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Kirim Sanggahan
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
