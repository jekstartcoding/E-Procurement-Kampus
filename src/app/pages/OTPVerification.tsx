import { useState } from "react";
import { useNavigate } from "react-router";
import { Building2, ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Kode OTP harus 6 digit");
      return;
    }

    setLoading(true);

    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      toast.success("Login berhasil!");
      // Redirect based on role (for demo, redirect to vendor dashboard)
      navigate("/vendor");
    }, 1500);
  };

  const handleResend = () => {
    toast.success("Kode OTP baru telah dikirim ke email Anda");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A56DB] to-[#1e40af] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="w-10 h-10 text-white" />
            <span className="text-2xl font-bold text-white">E-Procurement</span>
          </div>
          <p className="text-white/90">Verifikasi Kode OTP</p>
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#1A56DB]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Masukkan Kode OTP</h2>
            <p className="text-sm text-gray-600">
              Kami telah mengirim kode 6 digit ke email Anda
            </p>
            <p className="text-sm font-medium text-[#1A56DB] mt-1">
              nama@kampus.ac.id
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.some(d => !d)}
              className="w-full py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
            >
              {loading ? "Memverifikasi..." : "Verifikasi"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Tidak menerima kode?
              </p>
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-[#1A56DB] font-medium hover:underline"
              >
                Kirim Ulang Kode OTP
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 text-white hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
}
