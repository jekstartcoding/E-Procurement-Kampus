import { DashboardLayout } from "../../components/DashboardLayout";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Building2, FileText, Upload } from "lucide-react";

interface PaketDetail {
  nama: string;
  instansi: string;
  kategori: string;
  estimasi: number;
  batasWaktu: string;
  tanggalMulai: string;
  deskripsi: string;
  spesifikasi: string[];
  kuantitas: number;
  lokasiPengiriman: string;
  kontakPerson: string;
}

export default function PaketLelangDetail() {
  const { paketId } = useParams();
  const navigate = useNavigate();

  const allPaket: Record<string, PaketDetail> = {
    PKT001: {
      nama: "Pengadaan Laptop",
      instansi: "Fakultas Teknik",
      kategori: "Teknologi Informasi",
      estimasi: 240000000,
      batasWaktu: "2026-05-25 23:59:59",
      tanggalMulai: "2026-05-10",
      deskripsi: "Pengadaan laptop untuk keperluan laboratorium komputer Fakultas Teknik dengan spesifikasi standar untuk pembelajaran dan praktikum mahasiswa.",
      spesifikasi: [
        "Processor: Intel Core i5 generasi 11 atau setara",
        "RAM: 8GB DDR4",
        "Storage: 512GB SSD",
        "Display: 14 inch Full HD",
        "OS: Windows 11 Pro",
        "Garansi: 3 tahun",
      ],
      kuantitas: 20,
      lokasiPengiriman: "Gedung Lab Komputer, Fakultas Teknik, Kampus Utama",
      kontakPerson: "Bapak Ahmad (ahmad@kampus.ac.id, 081234567890)",
    },
    PKT002: {
      nama: "Peralatan Laboratorium",
      instansi: "Fakultas MIPA",
      kategori: "Peralatan Lab",
      estimasi: 150000000,
      batasWaktu: "2026-05-28 23:59:59",
      tanggalMulai: "2026-05-12",
      deskripsi: "Pengadaan peralatan laboratorium fisika dan kimia dasar untuk menunjang praktikum mahasiswa baru.",
      spesifikasi: [
        "Mikroskop Binokuler: 10 unit",
        "Neraca Analitik Digital: 5 unit",
        "Alat Gelombang dan Optik: 5 set",
        "Garansi kalibrasi: 1 tahun",
      ],
      kuantitas: 20,
      lokasiPengiriman: "Gedung Lab MIPA, Kampus Utama",
      kontakPerson: "Ibu Siti (siti@kampus.ac.id, 081234567891)",
    },
    PKT003: {
      nama: "Kursi Kuliah",
      instansi: "Rektorat",
      kategori: "Furnitur",
      estimasi: 75000000,
      batasWaktu: "2026-05-15 23:59:59",
      tanggalMulai: "2026-05-01",
      deskripsi: "Pengadaan kursi kuliah lipat dengan meja tulis untuk ruang kelas di gedung kuliah bersama.",
      spesifikasi: [
        "Bahan rangka: Pipa besi finishing powder coating",
        "Bahan dudukan & sandaran: Plywood lapis HPL",
        "Meja tulis: Dapat dilipat, bahan plywood",
        "Kapasitas beban: min 120 kg",
        "Garansi rangka: 2 tahun",
      ],
      kuantitas: 150,
      lokasiPengiriman: "Gedung Kuliah Bersama, Kampus Utama",
      kontakPerson: "Bapak Budi (budi@kampus.ac.id, 081234567892)",
    },
    PKT004: {
      nama: "Proyektor",
      instansi: "Fakultas Ekonomi",
      kategori: "Teknologi Informasi",
      estimasi: 85000000,
      batasWaktu: "2026-05-30 23:59:59",
      tanggalMulai: "2026-05-15",
      deskripsi: "Pengadaan LCD Proyektor ansi lumens tinggi untuk ruang auditorium dan kelas besar Fakultas Ekonomi.",
      spesifikasi: [
        "Brightness: min 4000 ANSI Lumens",
        "Resolution: WUXGA (1920x1200)",
        "Contrast Ratio: 20.000:1",
        "Lamp Life: min 10.000 hours (Eco mode)",
        "Garansi unit: 2 tahun, lampu 1 tahun",
      ],
      kuantitas: 10,
      lokasiPengiriman: "Gedung Fakultas Ekonomi, Kampus Utama",
      kontakPerson: "Bapak Herman (herman@kampus.ac.id, 081234567893)",
    },
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
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, isExpired: diff < 0 };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <DashboardLayout role="vendor" userName="PT. Teknologi Sejahtera">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/vendor/paket-lelang")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Paket Lelang</h1>
            <p className="text-gray-600 mt-1">Informasi lengkap paket tender</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{paketData.nama}</h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-600">ID Paket</label>
                  <p className="font-medium text-gray-900">{paketData.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Instansi</label>
                  <p className="font-medium text-gray-900">{paketData.instansi}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Kategori</label>
                  <p className="font-medium text-gray-900">{paketData.kategori}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Estimasi Nilai</label>
                  <p className="font-bold text-[#1A56DB]">
                    Rp {paketData.estimasi.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Kuantitas</label>
                  <p className="font-medium text-gray-900">{paketData.kuantitas} unit</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tanggal Mulai</label>
                  <p className="font-medium text-gray-900">
                    {new Date(paketData.tanggalMulai).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-600 block mb-2">Deskripsi</label>
                <p className="text-gray-900">{paketData.deskripsi}</p>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-600 block mb-3">Spesifikasi Teknis</label>
                <ul className="space-y-2">
                  {paketData.spesifikasi.map((spec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#1A56DB] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-900">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Lokasi Pengiriman</label>
                  <p className="text-gray-900">{paketData.lokasiPengiriman}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Kontak Person</label>
                  <p className="text-gray-900">{paketData.kontakPerson}</p>
                </div>
              </div>
            </div>

            {/* Dokumen Tender */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Dokumen Tender</h2>
              <div className="space-y-3">
                {["Dokumen RKS", "Spesifikasi Teknis Detail", "Syarat dan Ketentuan"].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#1A56DB]" />
                      <span className="font-medium text-gray-900">{doc}.pdf</span>
                    </div>
                    <button className="px-4 py-2 text-sm text-[#1A56DB] hover:bg-blue-50 rounded-lg transition-colors">
                      Unduh
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Countdown Timer */}
            <div className={`rounded-xl p-6 border-2 ${
              timeRemaining.isExpired ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
            }`}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {timeRemaining.isExpired ? "Tender Telah Berakhir" : "Sisa Waktu Upload"}
              </h3>

              {!timeRemaining.isExpired && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#1A56DB]">{timeRemaining.days}</p>
                    <p className="text-xs text-gray-600">Hari</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#1A56DB]">{timeRemaining.hours}</p>
                    <p className="text-xs text-gray-600">Jam</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-[#1A56DB]">{timeRemaining.minutes}</p>
                    <p className="text-xs text-gray-600">Menit</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Batas Upload:</span>
                </div>
                <p className="font-medium text-gray-900">
                  {new Date(paketData.batasWaktu).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Aksi</h3>

              {timeRemaining.isExpired ? (
                <div className="space-y-3 mb-3">
                  <button
                    disabled
                    className="w-full py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                  >
                    Masa Upload Berakhir
                  </button>
                  <Link
                    to={`/vendor/sanggahan/${paketData.id}`}
                    className="block w-full py-3 bg-[#E02424] text-white text-center rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" />
                      Ajukan Sanggahan
                    </div>
                  </Link>
                </div>
              ) : (
                <Link
                  to={`/vendor/upload-penawaran/${paketData.id}`}
                  className="block w-full py-3 bg-[#1A56DB] text-white text-center rounded-lg font-medium hover:bg-[#1e40af] transition-colors mb-3"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Penawaran
                  </div>
                </Link>
              )}

              <button
                onClick={() => navigate("/vendor/paket-lelang")}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Kembali ke Daftar
              </button>
            </div>

            {/* Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 mb-1">Perhatian</p>
                  <p className="text-xs text-yellow-700">
                    Pastikan dokumen penawaran Anda sudah disiapkan sebelum batas waktu upload berakhir.
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
