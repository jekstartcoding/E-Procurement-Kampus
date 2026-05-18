import { Link } from "react-router";
import { Building2, ShieldCheck, FileText, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A56DB] to-[#1e40af]">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-white" />
              <span className="text-xl font-semibold text-white">E-Procurement Kampus</span>
            </div>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-[#1A56DB] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Sistem E-Procurement Kampus
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Platform pengadaan barang dan jasa yang transparan, efisien, dan terpercaya untuk institusi pendidikan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register-vendor"
              className="px-8 py-3 bg-white text-[#1A56DB] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Daftar Sebagai Vendor Baru
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Masuk ke Sistem
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Transparan & Aman</h3>
            <p className="text-white/80">
              Sistem terenkripsi dengan proses verifikasi berlapis untuk menjamin keamanan data
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Proses Digital</h3>
            <p className="text-white/80">
              Semua proses dilakukan secara digital, dari pendaftaran hingga penetapan pemenang
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Efisien & Cepat</h3>
            <p className="text-white/80">
              Hemat waktu dan biaya dengan sistem yang terstruktur dan terotomasi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
