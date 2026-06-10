import { useRouteError, isRouteErrorResponse, Link, useNavigate } from "react-router";
import { AlertTriangle, Home, ArrowLeft, ShieldAlert } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "Terjadi kesalahan yang tidak terduga pada aplikasi.";
  let errorTitle = "Oops! Terjadi Kesalahan";
  let statusCode = 500;

  if (!error) {
    statusCode = 404;
    errorTitle = "Halaman Tidak Ditemukan";
    errorMessage = "Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.";
  } else if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      errorTitle = "Halaman Tidak Ditemukan";
      errorMessage = "Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.";
    } else if (error.status === 401) {
      errorTitle = "Tidak Memiliki Akses";
      errorMessage = "Anda tidak memiliki otorisasi untuk mengakses halaman ini.";
    } else if (error.status === 503) {
      errorTitle = "Layanan Tidak Tersedia";
      errorMessage = "Sistem kami sedang dalam pemeliharaan. Silakan coba beberapa saat lagi.";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A56DB] via-[#1e40af] to-slate-900 flex items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl text-center text-white relative overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
        {/* Glow effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-white/10 animate-pulse">
            {statusCode === 404 ? (
              <ShieldAlert className="w-10 h-10 text-yellow-300" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-red-400" />
            )}
          </div>

          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wider uppercase mb-2">
            Error {statusCode}
          </span>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3 font-poppins">
            {errorTitle}
          </h1>
          
          <p className="text-blue-100/90 text-sm leading-relaxed mb-8 font-inter">
            {errorMessage}
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
