import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Trophy, Award, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Vendor {
  id: string;
  nama: string;
  skorTeknis: number;
  skorHarga: number;
  skorKualifikasi: number;
  totalSkor: number;
  ranking: number;
}

export default function EvaluasiPaket() {
  const { paketId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"teknis" | "harga" | "kualifikasi">("teknis");
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: "V001", nama: "PT. Teknologi Sejahtera", skorTeknis: 0, skorHarga: 0, skorKualifikasi: 0, totalSkor: 0, ranking: 0 },
    { id: "V002", nama: "CV. Maju Jaya", skorTeknis: 0, skorHarga: 0, skorKualifikasi: 0, totalSkor: 0, ranking: 0 },
    { id: "V003", nama: "PT. Sinar Abadi", skorTeknis: 0, skorHarga: 0, skorKualifikasi: 0, totalSkor: 0, ranking: 0 },
    { id: "V004", nama: "PT. Karya Mandiri", skorTeknis: 0, skorHarga: 0, skorKualifikasi: 0, totalSkor: 0, ranking: 0 },
    { id: "V005", nama: "CV. Digital Solutions", skorTeknis: 0, skorHarga: 0, skorKualifikasi: 0, totalSkor: 0, ranking: 0 },
  ]);

  const [winner, setWinner] = useState<Vendor | null>(null);

  const bobotTeknis = 40;
  const bobotHarga = 35;
  const bobotKualifikasi = 25;

  const paketData = {
    id: paketId,
    nama: "Pengadaan Laptop",
    instansi: "Fakultas Teknik",
  };

  useEffect(() => {
    calculateTotalAndRanking();
  }, [vendors]);

  const updateVendorScore = (vendorId: string, field: "skorTeknis" | "skorHarga" | "skorKualifikasi", value: number) => {
    if (value < 0 || value > 100) {
      toast.error("Skor harus antara 0-100");
      return;
    }

    setVendors((prev) =>
      prev.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, [field]: value } : vendor
      )
    );
  };

  const calculateTotalAndRanking = () => {
    const updatedVendors = vendors.map((vendor) => {
      const totalSkor =
        (vendor.skorTeknis * bobotTeknis) / 100 +
        (vendor.skorHarga * bobotHarga) / 100 +
        (vendor.skorKualifikasi * bobotKualifikasi) / 100;
      return { ...vendor, totalSkor };
    });

    const sortedVendors = [...updatedVendors].sort((a, b) => b.totalSkor - a.totalSkor);
    const rankedVendors = sortedVendors.map((vendor, index) => ({
      ...vendor,
      ranking: index + 1,
    }));

    const finalVendors = rankedVendors.sort((a, b) => a.id.localeCompare(b.id));
    setVendors(finalVendors);
  };

  const allScoresFilled = vendors.every(
    (v) => v.skorTeknis > 0 && v.skorHarga > 0 && v.skorKualifikasi > 0
  );

  const handleSetWinner = () => {
    if (!allScoresFilled) {
      toast.error("Semua skor harus diisi terlebih dahulu");
      return;
    }

    const topVendor = vendors.reduce((prev, current) =>
      current.totalSkor > prev.totalSkor ? current : prev
    );

    setWinner(topVendor);
    toast.success(`${topVendor.nama} ditetapkan sebagai pemenang!`);
  };

  if (winner) {
    return (
      <DashboardLayout role="panitia" userName="Panitia Pengadaan">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-yellow-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pemenang Tender Ditetapkan!</h2>
            <p className="text-gray-600 mb-8">
              Evaluasi selesai dan pemenang telah ditentukan
            </p>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900">Pemenang Tender</h3>
              </div>

              <p className="text-2xl font-bold text-gray-900 mb-2">{winner.nama}</p>
              <p className="text-sm text-gray-600 mb-4">ID: {winner.id}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Skor Teknis</p>
                  <p className="text-lg font-bold text-[#1A56DB]">{winner.skorTeknis}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Skor Harga</p>
                  <p className="text-lg font-bold text-[#1A56DB]">{winner.skorHarga}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Skor Kualifikasi</p>
                  <p className="text-lg font-bold text-[#1A56DB]">{winner.skorKualifikasi}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Total Skor Akhir</p>
                <p className="text-3xl font-bold text-[#0E9F6E]">
                  {winner.totalSkor.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/panitia")}
              className="px-8 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="panitia" userName="Panitia Pengadaan">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/panitia")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Evaluasi & Ranking Vendor</h1>
            <p className="text-gray-600 mt-1">{paketData.nama} - {paketData.instansi}</p>
          </div>
        </div>

        {/* Info Bobot */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Bobot Penilaian</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Teknis</p>
              <p className="text-2xl font-bold text-[#1A56DB]">{bobotTeknis}%</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Harga</p>
              <p className="text-2xl font-bold text-[#1A56DB]">{bobotHarga}%</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Kualifikasi</p>
              <p className="text-2xl font-bold text-[#1A56DB]">{bobotKualifikasi}%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { key: "teknis" as const, label: "Penilaian Teknis" },
                { key: "harga" as const, label: "Penilaian Harga" },
                { key: "kualifikasi" as const, label: "Penilaian Kualifikasi" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-[#1A56DB] border-b-2 border-[#1A56DB]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      ID Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Nama Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Skor (0-100)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{vendor.nama}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={
                            activeTab === "teknis"
                              ? vendor.skorTeknis
                              : activeTab === "harga"
                              ? vendor.skorHarga
                              : vendor.skorKualifikasi
                          }
                          onChange={(e) => {
                            const field =
                              activeTab === "teknis"
                                ? "skorTeknis"
                                : activeTab === "harga"
                                ? "skorHarga"
                                : "skorKualifikasi";
                            updateVendorScore(vendor.id, field, parseInt(e.target.value) || 0);
                          }}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Ranking Vendor (Otomatis)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Ranking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Nama Vendor
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                    Teknis (40%)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                    Harga (35%)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                    Kualifikasi (25%)
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                    Total Skor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[...vendors]
                  .sort((a, b) => b.totalSkor - a.totalSkor)
                  .map((vendor, index) => (
                    <tr
                      key={vendor.id}
                      className={`hover:bg-gray-50 ${
                        index === 0 && vendor.totalSkor > 0 ? "bg-yellow-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && vendor.totalSkor > 0 && (
                            <Trophy className="w-5 h-5 text-yellow-600" />
                          )}
                          <span className="text-sm font-bold text-gray-900">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.nama}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {vendor.skorTeknis}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {vendor.skorHarga}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {vendor.skorKualifikasi}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-[#1A56DB]">
                          {vendor.totalSkor.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/panitia")}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSetWinner}
              disabled={!allScoresFilled}
              className="flex-1 px-6 py-3 bg-[#0E9F6E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Tetapkan Pemenang
            </button>
          </div>

          {!allScoresFilled && (
            <p className="text-sm text-yellow-700 text-center mt-4">
              Semua skor harus diisi sebelum menetapkan pemenang
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
