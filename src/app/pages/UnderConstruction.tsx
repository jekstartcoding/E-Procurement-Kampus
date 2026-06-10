import { Link, useNavigate } from "react-router";
import { Hammer, Home, ArrowLeft } from "lucide-react";

export default function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A56DB] via-[#1e40af] to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl text-center text-white relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-white/10 animate-bounce">
            <Hammer className="w-10 h-10 text-yellow-300" />
          </div>

          <span className="px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs font-semibold tracking-wider uppercase mb-2">
            Prototype Only
          </span>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3 font-poppins">
            Fitur dalam Pengembangan
          </h1>
          
          <p className="text-blue-100/95 text-sm leading-relaxed mb-8 font-inter">
            Halaman ini adalah bagian dari rencana pengembangan modul lanjutan dan belum diimplementasikan pada versi prototype UAT saat ini.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl font-medium text-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#1A56DB] hover:bg-gray-100 rounded-xl font-semibold text-sm shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              Ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
