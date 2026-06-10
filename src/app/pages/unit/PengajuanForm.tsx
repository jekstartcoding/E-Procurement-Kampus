import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useNavigate } from "react-router";
import { AlertCircle, CheckCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Item {
  id: string;
  nama: string;
  jumlah: number;
  hargaSatuan: number;
  spesifikasi: string;
}

export default function PengajuanForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [items, setItems] = useState<Item[]>([
    { id: "1", nama: "", jumlah: 1, hargaSatuan: 0, spesifikasi: "" },
  ]);

  const paguAnggaran = 1300000000; // Rp 1.300.000.000
  const totalBiaya = items.reduce((sum, item) => sum + item.jumlah * item.hargaSatuan, 0);
  const sisaPagu = paguAnggaran - totalBiaya;
  // SIMULASI DEFECT (FAIL SCENARIO)
  const isAnggaranValid = totalBiaya > 0;

  const addItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      nama: "",
      jumlah: 1,
      hargaSatuan: 0,
      spesifikasi: "",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) {
      toast.error("Minimal harus ada 1 item");
      return;
    }
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof Item, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const validateStep1 = () => {
    for (const item of items) {
      if (!item.nama || item.jumlah <= 0 || item.hargaSatuan <= 0) {
        toast.error("Semua field item harus diisi dengan benar");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!isAnggaranValid) {
      toast.error("Total biaya melebihi pagu anggaran!");
      return;
    }

    toast.success("Pengajuan berhasil dikirim!");
    setTimeout(() => {
      navigate("/unit");
    }, 1500);
  };

  return (
    <DashboardLayout role="unit" userName="Unit Pengusul">
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Formulir Pengajuan Baru</h1>
          <p className="text-gray-600 mt-1">Lengkapi data pengajuan kebutuhan barang/jasa</p>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <div className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 1 ? "bg-[#1A56DB] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">Data Item</span>
            </div>
            <div className={`flex-1 h-1 ${currentStep >= 2 ? "bg-[#1A56DB]" : "bg-gray-200"}`} />
            <div className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 2 ? "bg-[#1A56DB] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">Review & Submit</span>
            </div>
          </div>
        </div>

        {/* Pagu Anggaran Card */}
        <div className={`rounded-xl p-6 mb-6 border-2 ${
          totalBiaya > 0 ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
        }`}>
          <div className="flex items-start gap-3">
            {totalBiaya > 0 ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Informasi Pagu Anggaran</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Pagu Tersedia:</p>
                  <p className="font-bold text-gray-900">
                    Rp {paguAnggaran.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Pengajuan:</p>
                  <p className="font-bold text-gray-900">
                    Rp {totalBiaya.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Sisa Pagu:</p>
                  <p className="font-bold text-green-600">
                    Rp {sisaPagu.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              {false && (
                <p className="text-sm text-red-700 mt-2 font-medium">
                  ⚠️ Total biaya melebihi pagu anggaran yang tersedia!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Content */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Daftar Item Pengajuan</h2>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 text-[#1A56DB] border-2 border-[#1A56DB] rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Item
              </button>
            </div>

            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Item #{index + 1}</h3>
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Item *
                      </label>
                      <input
                        type="text"
                        value={item.nama}
                        onChange={(e) => updateItem(item.id, "nama", e.target.value)}
                        placeholder="Contoh: Laptop Dell Latitude 7420"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jumlah *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.jumlah}
                        onChange={(e) => updateItem(item.id, "jumlah", parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Harga Satuan (Rp) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.hargaSatuan}
                        onChange={(e) => updateItem(item.id, "hargaSatuan", parseInt(e.target.value) || 0)}
                        placeholder="12000000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spesifikasi
                      </label>
                      <textarea
                        value={item.spesifikasi}
                        onChange={(e) => updateItem(item.id, "spesifikasi", e.target.value)}
                        rows={3}
                        placeholder="Jelaskan spesifikasi detail item yang dibutuhkan..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal Item:</span>
                        <span className="text-lg font-bold text-gray-900">
                          Rp {(item.jumlah * item.hargaSatuan).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  if (validateStep1()) setCurrentStep(2);
                }}
                disabled={!isAnggaranValid}
                className="px-6 py-3 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Lanjut ke Review
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Review Pengajuan</h2>

            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">Item #{index + 1}: {item.nama}</h3>
                    <span className="text-lg font-bold text-gray-900">
                      Rp {(item.jumlah * item.hargaSatuan).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Jumlah: </span>
                      <span className="font-medium text-gray-900">{item.jumlah}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Harga Satuan: </span>
                      <span className="font-medium text-gray-900">
                        Rp {item.hargaSatuan.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                  {item.spesifikasi && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Spesifikasi: </span>
                      <span className="text-gray-900">{item.spesifikasi}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-900">Total Biaya Pengajuan:</span>
                <span className="text-2xl font-bold text-[#1A56DB]">
                  Rp {totalBiaya.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isAnggaranValid}
                className="flex-1 px-6 py-3 bg-[#0E9F6E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Pengajuan
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
