# E-Procurement Kampus - Panduan UAT (User Acceptance Testing)

## Overview
Sistem E-Procurement Kampus adalah prototype web application untuk mengelola proses pengadaan barang dan jasa di institusi pendidikan. Sistem ini mendukung 4 role pengguna: Vendor, Admin Pengadaan, Unit Pengusul, dan Panitia Evaluator.

## Quick Start Navigation

### URL Utama
- **Landing Page**: `/`
- **Login**: `/login`
- **Registrasi Vendor**: `/register-vendor`

### Dashboard Role-Based
- **Admin**: `/admin`
- **Unit Pengusul**: `/unit`
- **Vendor**: `/vendor`
- **Panitia**: `/panitia`

---

## FLOW 1: Registrasi Vendor

### Tujuan UAT
Menguji flow pendaftaran vendor baru dari awal hingga akhir.

### Langkah Testing

1. **Akses Landing Page** (`/`)
   - Klik tombol "Daftar Sebagai Vendor Baru"

2. **Form Multi-Step** (`/register-vendor`)
   - **Step 1 - Data Perusahaan**:
     - Isi semua field (Nama, Alamat, Email, Telepon, Bidang Usaha)
     - Test validasi: coba klik "Lanjut" tanpa mengisi → harus muncul error
     - Isi semua field lalu klik "Lanjut"
   
   - **Step 2 - Upload Dokumen**:
     - Upload NIB, NPWP, SIUP (format PDF/JPG/PNG max 5MB)
     - Test upload file > 5MB → harus muncul error
     - Test upload file format salah → harus muncul error
     - Upload semua dokumen dengan benar
   
   - **Step 3 - Konfirmasi**:
     - Review semua data yang diinput
     - Klik "Kirim Pendaftaran"
     - Harus muncul success message

3. **Success State**
   - Cek apakah digital receipt muncul dengan informasi lengkap
   - Klik "Kembali ke Login"

### Expected Result
✅ Vendor berhasil mendaftar dan dapat login setelah diverifikasi admin

---

## FLOW 2: Verifikasi Vendor (Admin)

### Tujuan UAT
Menguji flow admin dalam memverifikasi vendor yang mendaftar.

### Langkah Testing

1. **Login sebagai Admin** (`/login`)
   - Akses `/admin` (skip login untuk prototype)

2. **Dashboard Admin** (`/admin`)
   - Lihat statistik vendor pending
   - Klik "Verifikasi Vendor" atau akses `/admin/verifikasi-vendor`

3. **List Vendor Pending** (`/admin/verifikasi-vendor`)
   - Test search: cari vendor berdasarkan nama
   - Test filter: filter by status
   - Klik "Tinjau" pada vendor yang pending

4. **Detail Verifikasi** (`/admin/verifikasi-vendor/:vendorId`)
   - Review informasi perusahaan
   - Klik "Unduh" untuk simulasi download dokumen
   - **Test Case Approve**:
     - Pilih status "Verifikasi"
     - Klik "Simpan & Verifikasi"
     - Harus muncul success message
   
   - **Test Case Reject**:
     - Pilih status "Tolak Verifikasi"
     - Coba submit tanpa isi alasan → harus error
     - Isi alasan penolakan
     - Klik "Simpan & Tolak"
     - Harus muncul success message

### Expected Result
✅ Admin dapat approve/reject vendor dengan validasi yang benar

---

## FLOW 3: Pengajuan Kebutuhan (Unit Pengusul)

### Tujuan UAT
Menguji flow unit pengusul dalam mengajukan kebutuhan barang/jasa.

### Langkah Testing

1. **Dashboard Unit** (`/unit`)
   - Lihat sisa pagu anggaran
   - Klik "Pengajuan Baru"

2. **Form Pengajuan** (`/unit/pengajuan-baru`)
   - **Test Case Normal**:
     - Tambah 2-3 item
     - Isi nama, jumlah, harga satuan, spesifikasi
     - Pastikan total < pagu anggaran
     - Klik "Lanjut ke Review"
     - Review data
     - Klik "Submit Pengajuan"
   
   - **Test Case Melebihi Pagu**:
     - Tambah item dengan total > pagu anggaran
     - Harus muncul warning merah
     - Tombol submit harus disabled
     - Kurangi jumlah/harga sampai valid

   - **Test Validation**:
     - Coba submit dengan field kosong → harus error
     - Test auto-calculate total biaya

3. **View Pengajuan** (`/unit/pengajuan-saya`)
   - Lihat list pengajuan
   - Test search & filter

### Expected Result
✅ Validasi pagu anggaran bekerja dengan benar
✅ Tidak bisa submit jika melebihi pagu

---

## FLOW 4: Tender & Upload Penawaran (Vendor)

### Tujuan UAT
Menguji flow vendor dalam melihat tender dan upload penawaran.

### Langkah Testing

1. **Dashboard Vendor** (`/vendor`)
   - Lihat statistik paket tender
   - Klik "Lihat Paket Tersedia"

2. **List Paket Tender** (`/vendor/paket-lelang`)
   - Test search paket
   - Test filter by status (Aktif/Berakhir)
   - Lihat countdown timer
   - Klik "Lihat Detail" pada paket aktif

3. **Detail Paket** (`/vendor/paket-lelang/:paketId`)
   - Review informasi paket
   - Lihat countdown timer besar
   - Download dokumen tender (simulasi)
   - Klik "Upload Penawaran"

4. **Upload Penawaran** (`/vendor/upload-penawaran/:paketId`)
   - **Test File Upload**:
     - Upload dokumen teknis (PDF)
     - Upload dokumen harga (PDF)
     - Lihat progress bar
     - Lihat encryption indicator (AES-256)
   
   - **Test Validation**:
     - Coba submit tanpa upload → harus disabled
     - Upload file > 10MB → harus error
     - Upload format selain PDF → harus error
   
   - **Success Flow**:
     - Upload kedua dokumen dengan benar
     - Klik "Upload & Kirim Penawaran"
     - Harus muncul digital receipt

5. **Test Timer Expired**
   - Untuk paket PKT003 (expired), coba akses upload
   - Harus muncul pesan "Masa upload berakhir"
   - Upload area harus disabled

### Expected Result
✅ Encryption indicator muncul
✅ Tidak bisa upload setelah deadline
✅ Digital receipt muncul setelah submit

---

## FLOW 5: Evaluasi Vendor (Panitia)

### Tujuan UAT
Menguji sistem penilaian dan ranking otomatis vendor.

### Langkah Testing

1. **Dashboard Panitia** (`/panitia`)
   - Lihat paket yang perlu evaluasi
   - Klik "Mulai Evaluasi" pada paket

2. **Form Evaluasi** (`/panitia/evaluasi/:paketId`)
   - Lihat info bobot penilaian (Teknis 40%, Harga 35%, Kualifikasi 25%)
   
   - **Tab Penilaian Teknis**:
     - Isi skor 0-100 untuk setiap vendor
     - Test validasi: coba isi > 100 → harus error
   
   - **Tab Penilaian Harga**:
     - Isi skor untuk semua vendor
   
   - **Tab Penilaian Kualifikasi**:
     - Isi skor untuk semua vendor

3. **Ranking Otomatis**
   - Lihat tabel ranking (harus update realtime)
   - Cek perhitungan total skor otomatis
   - Vendor dengan skor tertinggi harus ranking #1 dengan icon trophy

4. **Penetapan Pemenang**
   - **Test Case Belum Lengkap**:
     - Coba klik "Tetapkan Pemenang" sebelum semua skor diisi
     - Tombol harus disabled + muncul warning
   
   - **Test Case Lengkap**:
     - Isi semua skor
     - Klik "Tetapkan Pemenang"
     - Harus muncul halaman pemenang dengan detail skor

### Expected Result
✅ Ranking update otomatis saat skor diisi
✅ Perhitungan bobot benar (40% + 35% + 25% = 100%)
✅ Pemenang = vendor dengan total skor tertinggi

---

## FLOW 6: Sanggahan (Vendor)

### Tujuan UAT
Menguji flow vendor dalam mengajukan sanggahan terhadap hasil evaluasi lelang.

### Langkah Testing

1. **Akses Form Sanggahan** (`/vendor/sanggahan/:paketId`)
   - Dapat diakses melalui tombol **"Ajukan Sanggahan"** di menu Aksi Cepat pada Dashboard Vendor (`/vendor`).
   - Dapat diakses dari Daftar Paket Lelang (`/vendor/paket-lelang`) untuk paket yang berstatus *Berakhir*.
   - Dapat diakses dari Halaman Detail Paket (`/vendor/paket-lelang/:paketId`) pada bagian menu Aksi ketika masa upload penawaran telah berakhir.
   - Lihat info paket dan pemenang.
   - Lihat countdown masa sanggah.

2. **Form Validation**
   - **Test Case: Argumen Kosong**:
     - Coba klik "Kirim Sanggahan" tanpa mengisi textarea.
     - Akan muncul error merah, border textarea dan background berubah merah (highlight field mandatory), serta muncul toast error. Form tidak terkirim.
   
   - **Test Case: Argumen < 50 karakter**:
     - Isi argumen < 50 karakter lalu coba kirim.
     - Akan muncul pesan error merah "minimal 50 karakter" di bawah field dan toast error. Form tidak terkirim.
   
   - **Test Case: Valid**:
     - Isi argumen ≥ 50 karakter.
     - Character counter harus update dan muncul ikon check hijau.
     - Klik "Kirim Sanggahan".
     - Akan muncul tampilan success message dengan detail sanggahan dan nomor referensi.

3. **Test Timer Expired**
   - Simulasi akses untuk paket yang masa sanggahnya telah habis (misalnya PKT003 di `/vendor/sanggahan/PKT003`).
   - Akan muncul pesan masa sanggah telah berakhir dan form pengisian diblokir.

### Expected Result
✅ Validasi textarea kosong memunculkan highlight error merah dan pesan mandatory.
✅ Validasi minimal 50 karakter bekerja dengan benar.
✅ Tidak bisa submit setelah masa sanggah berakhir.
✅ Success message muncul dengan nomor referensi setelah pengajuan berhasil.

---

## Negative Testing Checklist

### General
- [ ] Test navigasi dengan URL langsung
- [ ] Test browser back button
- [ ] Test refresh halaman
- [ ] Test responsiveness (desktop, tablet, mobile)

### Form Validation
- [ ] Submit form kosong → harus error
- [ ] Test input dengan karakter spesial
- [ ] Test paste data
- [ ] Test auto-complete browser

### File Upload
- [ ] Upload file > max size
- [ ] Upload file format salah
- [ ] Upload file corrupt
- [ ] Multiple upload cepat berturut-turut

### Timer/Deadline
- [ ] Akses fitur setelah deadline
- [ ] Submit tepat saat deadline
- [ ] Countdown timer akurat

---

## Color Scheme Reference

Untuk UAT visual consistency:

- **Primary**: #1A56DB (Blue - untuk tombol utama, highlight)
- **Success**: #0E9F6E (Green - untuk status approved, success)
- **Warning**: #F59E0B (Yellow - untuk pending, alert)
- **Danger**: #E02424 (Red - untuk reject, error)
- **Background**: #F9FAFB (Light gray)
- **Card**: #FFFFFF (White)

---

## Font Usage

- **Headings (h1-h6)**: Poppins SemiBold
- **Body Text**: Inter Regular

---

## Browser Compatibility

Test di browser berikut:
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## Known Limitations (Prototype)

⚠️ **Ini adalah prototype UAT, bukan production:**
- Tidak ada backend real (semua data mock)
- Tidak ada autentikasi real
- File upload tidak disimpan ke server
- Tidak ada persistence data (refresh = reset)
- Timer menggunakan hardcoded date

---

## Bug Report Format

Jika menemukan bug, catat:
1. **URL**: Halaman mana
2. **Role**: Sebagai user role apa
3. **Steps**: Langkah reproduksi
4. **Expected**: Yang seharusnya terjadi
5. **Actual**: Yang terjadi
6. **Screenshot**: Jika memungkinkan

---

## Quick Navigation Shortcuts

### Public Pages
- Landing: `/`
- Login: `/login`
- Register Vendor: `/register-vendor`

### Admin
- Dashboard: `/admin`
- Vendor List: `/admin/verifikasi-vendor`
- Verify Vendor: `/admin/verifikasi-vendor/V001`

### Unit Pengusul
- Dashboard: `/unit`
- New Request: `/unit/pengajuan-baru`
- My Requests: `/unit/pengajuan-saya`

### Vendor
- Dashboard: `/vendor`
- Tender List: `/vendor/paket-lelang`
- Tender Detail: `/vendor/paket-lelang/PKT001`
- Upload Bid: `/vendor/upload-penawaran/PKT001`
- Objection: `/vendor/sanggahan/PKT001`

### Panitia
- Dashboard: `/panitia`
- Evaluate: `/panitia/evaluasi/PKT001`

---

## Contact & Support

Untuk pertanyaan UAT atau bug report, silakan dokumentasikan dengan format di atas.

**Happy Testing! 🚀**
