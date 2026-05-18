import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, FileText, X, Lock, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { toast } from "sonner";

interface FileUpload {
  name: string;
  file: File | null;
  progress: number;
  uploaded: boolean;
}

export default function UploadPenawaran() {
  const { paketId } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState<Record<string, FileUpload>>({
    teknis: { name: "Dokumen Teknis", file: null, progress: 0, uploaded: false },
    harga: { name: "Dokumen Harga", file: null, progress: 0, uploaded: false },
  });

  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

interface UploadPaketInfo {
  nama: string;
  instansi: string;
  batasWaktu: string;
}

  const allPaket: Record<string, UploadPaketInfo> = {
    PKT001: { nama: "Pengadaan Laptop", instansi: "Fakultas Teknik", batasWaktu: "2026-05-25 23:59:59" },
    PKT002: { nama: "Peralatan Laboratorium", instansi: "Fakultas MIPA", batasWaktu: "2026-05-28 23:59:59" },
    PKT003: { nama: "Kursi Kuliah", instansi: "Rektorat", batasWaktu: "2026-05-15 23:59:59" },
    PKT004: { nama: "Proyektor", instansi: "Fakultas Ekonomi", batasWaktu: "2026-05-30 23:59:59" },
  };

  const baseData = paketId && allPaket[paketId] ? allPaket[paketId] : allPaket["PKT001"];
  const paketData = {
    id: paketId || "PKT001",
    ...baseData,
  };

  const getTimeRemaining = () => {
    const now = new Date("2026-05-18 10:00:00");
    const end = new Date(paketData.batasWaktu);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { days, isExpired: diff < 0 };
  };

  const timeRemaining = getTimeRemaining();

  const handleFileUpload = (key: string, file: File | null) => {
    if (!file) {
      setFiles({
        ...files,
        [key]: { ...files[key], file: null, progress: 0, uploaded: false },
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    if (!["application/pdf"].includes(file.type)) {
      toast.error("Format file harus PDF");
      return;
    }

    setFiles({
      ...files,
      [key]: { ...files[key], file, progress: 0, uploaded: false },
    });

    // Simulate upload progress
    simulateUpload(key);
  };

  const simulateUpload = (key: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) => ({
        ...prev,
        [key]: { ...prev[key], progress },
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) => ({
          ...prev,
          [key]: { ...prev[key], uploaded: true },
        }));
        toast.success(`${files[key].name} berhasil diunggah & dienkripsi`);
      }
    }, 200);
  };

  const handleSubmit = () => {
    if (!files.teknis.file || !files.harga.file) {
      toast.error("Semua dokumen harus diunggah");
      return;
    }

    if (!files.teknis.uploaded || !files.harga.uploaded) {
      toast.error("Tunggu hingga semua dokumen selesai diunggah");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setSubmitted(true);
      setReceiptData({
        nomorReferensi: `REF-${Date.now()}`,
        namaPaket: paketData.nama,
        timestamp: new Date().toLocaleString("id-ID"),
      });
      toast.success("Penawaran berhasil dikirim!");
    }, 2000);
  };

  if (submitted && receiptData) {
    return (
      <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Penawaran Berhasil Dikirim!</h2>
            <p className="text-gray-600 mb-8">
              Terima kasih. Penawaran Anda telah diterima dan terenkripsi dengan aman.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Digital Receipt</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Referensi:</span>
                  <span className="font-mono font-bold text-gray-900">{receiptData.nomorReferensi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama Paket:</span>
                  <span className="font-medium text-gray-900">{receiptData.namaPaket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waktu Submit:</span>
                  <span className="font-medium text-gray-900">{receiptData.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Terenkripsi dengan AES-256
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/vendor/paket-lelang")}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Kembali ke Daftar Paket
              </button>
              <button
                onClick={() => navigate("/vendor")}
                className="flex-1 px-6 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
              >
                Ke Dashboard
              </button>
            </div>
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

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Masa Upload Penawaran Telah Berakhir</h2>
            <p className="text-gray-600 mb-8">
              Batas waktu upload untuk paket tender ini sudah lewat.
            </p>

            <button
              onClick={() => navigate("/vendor/paket-lelang")}
              className="px-6 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
            >
              Kembali ke Daftar Paket
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
            onClick={() => navigate(`/vendor/paket-lelang/${paketId}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upload Penawaran</h1>
            <p className="text-gray-600 mt-1">{paketData.nama}</p>
          </div>
        </div>

        {/* Timer Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2">Perhatian Batas Waktu</h3>
              <p className="text-sm text-yellow-800 mb-3">
                Batas waktu upload: <span className="font-bold">{new Date(paketData.batasWaktu).toLocaleString("id-ID")}</span>
              </p>
              <p className="text-sm text-yellow-800">
                Sisa waktu: <span className="font-bold">{timeRemaining.days} hari lagi</span>
              </p>
            </div>
          </div>
        </div>

        {/* Upload Forms */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="space-y-6">
            {Object.entries(files).map(([key, data]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {data.name} *
                </label>

                {!data.file ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1 font-medium">
                        Klik untuk upload atau drag & drop
                      </p>
                      <p className="text-xs text-gray-500">PDF (Maksimal 10MB)</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(key, e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="w-8 h-8 text-[#1A56DB]" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{data.file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(data.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      {!data.uploaded && (
                        <button
                          onClick={() => handleFileUpload(key, null)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {data.progress > 0 && data.progress < 100 && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Mengupload & Mengenkripsi...</span>
                          <span className="font-medium text-[#1A56DB]">{data.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1A56DB] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${data.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Upload Success */}
                    {data.uploaded && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">
                          Upload berhasil
                        </span>
                        <div className="ml-auto flex items-center gap-2 text-green-700">
                          <Lock className="w-4 h-4" />
                          <span className="text-xs font-medium">AES-256 Encrypted</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Encryption Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Enkripsi Otomatis
                </p>
                <p className="text-xs text-blue-700">
                  Semua dokumen yang Anda upload akan otomatis dienkripsi menggunakan AES-256 untuk menjamin keamanan dan kerahasiaan penawaran.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/vendor/paket-lelang/${paketId}`)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                uploading ||
                !files.teknis.file ||
                !files.harga.file ||
                !files.teknis.uploaded ||
                !files.harga.uploaded
              }
              className="flex-1 px-6 py-3 bg-[#0E9F6E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? "Mengirim..." : "Upload & Kirim Penawaran"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
