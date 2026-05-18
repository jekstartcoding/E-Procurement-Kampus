import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Building2, Check, Upload, X, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type Step = 1 | 2 | 3;

interface FormData {
  namaPerusahaan: string;
  alamat: string;
  email: string;
  telepon: string;
  bidangUsaha: string;
}

interface FileUpload {
  name: string;
  file: File | null;
}

export default function VendorRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    namaPerusahaan: "",
    alamat: "",
    email: "",
    telepon: "",
    bidangUsaha: "",
  });

  const [files, setFiles] = useState<Record<string, FileUpload>>({
    nib: { name: "NIB", file: null },
    npwp: { name: "NPWP", file: null },
    siup: { name: "SIUP", file: null },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (key: string, file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    if (file && !["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Format file harus PDF, JPG, atau PNG");
      return;
    }

    setFiles({
      ...files,
      [key]: { ...files[key], file },
    });

    if (file) {
      toast.success(`File ${files[key].name} berhasil diunggah`);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.namaPerusahaan) newErrors.namaPerusahaan = "Nama perusahaan harus diisi";
    if (!formData.alamat) newErrors.alamat = "Alamat harus diisi";
    if (!formData.email) newErrors.email = "Email harus diisi";
    if (!formData.telepon) newErrors.telepon = "Nomor telepon harus diisi";
    if (!formData.bidangUsaha) newErrors.bidangUsaha = "Bidang usaha harus diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!files.nib.file) newErrors.nib = "Dokumen NIB harus diunggah";
    if (!files.npwp.file) newErrors.npwp = "Dokumen NPWP harus diunggah";
    if (!files.siup.file) newErrors.siup = "Dokumen SIUP harus diunggah";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Pendaftaran berhasil dikirim!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A56DB] to-[#1e40af] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih telah mendaftar. Tim kami akan memverifikasi dokumen Anda dalam 1-3 hari kerja.
            Anda akan menerima notifikasi melalui email.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
          >
            Kembali ke Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-[#1A56DB]" />
            <span className="text-2xl font-bold text-gray-900">Pendaftaran Vendor</span>
          </div>
          <p className="text-gray-600">Lengkapi data berikut untuk mendaftar sebagai vendor</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step
                        ? "bg-[#1A56DB] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">
                    {step === 1 && "Data Perusahaan"}
                    {step === 2 && "Upload Dokumen"}
                    {step === 3 && "Konfirmasi"}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 ${
                      currentStep > step ? "bg-[#1A56DB]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Perusahaan</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Perusahaan *
                </label>
                <input
                  type="text"
                  value={formData.namaPerusahaan}
                  onChange={(e) => setFormData({ ...formData, namaPerusahaan: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent ${
                    errors.namaPerusahaan ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="PT. Nama Perusahaan"
                />
                {errors.namaPerusahaan && (
                  <p className="text-sm text-red-600 mt-1">{errors.namaPerusahaan}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap *
                </label>
                <textarea
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent ${
                    errors.alamat ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Jl. Nama Jalan No. 123, Kota, Provinsi"
                />
                {errors.alamat && (
                  <p className="text-sm text-red-600 mt-1">{errors.alamat}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="email@perusahaan.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent ${
                      errors.telepon ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="08123456789"
                  />
                  {errors.telepon && (
                    <p className="text-sm text-red-600 mt-1">{errors.telepon}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bidang Usaha *
                </label>
                <select
                  value={formData.bidangUsaha}
                  onChange={(e) => setFormData({ ...formData, bidangUsaha: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent ${
                    errors.bidangUsaha ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Bidang Usaha</option>
                  <option value="teknologi">Teknologi Informasi</option>
                  <option value="konstruksi">Konstruksi</option>
                  <option value="alat_tulis">Alat Tulis Kantor</option>
                  <option value="furnitur">Furnitur</option>
                  <option value="konsultan">Jasa Konsultan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                {errors.bidangUsaha && (
                  <p className="text-sm text-red-600 mt-1">{errors.bidangUsaha}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Dokumen</h3>
              <p className="text-sm text-gray-600 mb-6">
                Upload dokumen persyaratan (Format: PDF, JPG, PNG. Maksimal 5MB)
              </p>

              {Object.entries(files).map(([key, data]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {data.name} *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors[key] ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {data.file ? (
                      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-[#1A56DB]" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900">{data.file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(data.file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFileUpload(key, null)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Klik untuk upload atau drag & drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (Maks. 5MB)</p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(key, e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {errors[key] && (
                    <p className="text-sm text-red-600 mt-1">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Konfirmasi Data</h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      Periksa Kembali Data Anda
                    </p>
                    <p className="text-sm text-blue-700">
                      Pastikan semua data yang Anda masukkan sudah benar sebelum mengirim pendaftaran.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Data Perusahaan</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nama Perusahaan:</span>
                      <span className="text-sm font-medium text-gray-900">{formData.namaPerusahaan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Telepon:</span>
                      <span className="text-sm font-medium text-gray-900">{formData.telepon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bidang Usaha:</span>
                      <span className="text-sm font-medium text-gray-900">{formData.bidangUsaha}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Dokumen Terupload</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {Object.entries(files).map(([key, data]) => (
                      <div key={key} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-900">{data.name}</span>
                        <span className="text-xs text-gray-500">({data.file?.name})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((currentStep - 1) as Step)}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
              )}
              {currentStep === 1 && (
                <Link
                  to="/login"
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-block"
                >
                  Batal
                </Link>
              )}
            </div>

            <div>
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-[#1A56DB] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
                >
                  Lanjut
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#0E9F6E] text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Kirim Pendaftaran
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
