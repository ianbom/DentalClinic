# Product Requirements Document (PRD) - Dental Clinic Booking System

## 1. Pendahuluan
### 1.1. Tujuan Dokumen
Dokumen ini menguraikan persyaratan produk mendetail untuk sistem website klinik gigi (Dental Clinic Booking System). Dokumen dirancang menjadi landasan pengembangan, fitur, dan operasional layanan pendaftaran daring, manajemen jadwal dokter, dan portal administrasi pasien.

### 1.2. Ringkasan Produk
Produk ini adalah aplikasi web (berbasis **Laravel 12.x + React + Inertia.js + TailwindCSS**) yang memfasilitasi dua sisi proses bisnis klinik gigi:
1. **Pasien (Portal Publik):** Membaca profil dokter, melihat ketersediaan jadwal, membuat janji temu (booking) secara mandiri, mengonfirmasi data pribadi, hingga melakukan proses *check-in/reschedule/cancel*.
2. **Admin (Dashboard):** Mengelola basis data operasional klinik secara terpusat, mengontrol kehadiran dokter, dan merespons aliran pelayanan reservasi pasien sehari-hari.

---

## 2. Target Pengguna (User Roles)
Sistem memiliki tipe (role) pengguna secara mendasar:
- **Pasien (Patient/Guest User)**: Pengguna umum, baik yang pertama kali mendaftar maupun pasien lama (memiliki Medical Record). 
- **Admin/Resepsionis**: Pihak internal klinik yang memiliki akses dashboard untuk mengelola manajemen pasien, jadwal dokter, statistik klinik, dan alur pendaftaran ulang.
- **Sistem (Backend Job)**: Memproses *background tasks* seperti pengiriman verifikasi (WA/Email), pembatalan otomatis, atau penjadwalan.

---

## 3. Fitur Utama (Features Specification)

### 3.1. Fitur Pasien & Portal Utama (*Patient Journey*)
* `GET /home`, `/services`, `/about`: Laman informasi umum tentang klinik, layanan yang disediakan, dan profil institusi.
* `GET /doctors`: Daftar seluruh dokter dengan spesialisasi, SIP, informasi pengalaman, foto profil, dll. Detail dokter menampilkan ulasan atau jadwal mendetail.
* **Proses Pendaftaran Rekam Medis & Booking**:
  - `POST /check-nik`: Pemvalidasian NIK pasien untuk membedakan antara pasien baru atau pasien lama (menyamakan data rekam medis/medical record).
  - `GET /doctors/{id}/booking`: Pasien memilih jadwal dokter gigi (Tanggal dan Slot Jam) berdasarkan ketersediaan.
  - Sesi Cek Form Ketersediaan (`api/cities`, `api/districts`, `api/villages`): Auto-fill wilayah pasien (Indonesia).
  - `POST /booking/create`: Pasien memfinalisasi pembuatan janji temu. Menerima kode unik keberhasilan.
* **Manajemen Pasien Mandiri**:
  - `GET /check-booking`: Pengecekan status pendaftaran *booking* dari pasien.
  - `POST /booking/cancel`: Pembatalan mandiri sebelum jam kedatangan.
  - `POST /booking/checkin`: Pemeriksaan/Lapor mandiri (*Self Check-In*) oleh pasien lewat ponsel.

### 3.2. Fitur Otentikasi dan Akun (Auth)
* Mengacu ke standarisasi otentikasi (menggunakan *Laravel Breeze/Sanctum*):
  - Autentikasi Admin: `login`, `logout` via email/password.
  - Verifikasi Keamanan: Lupa password (`forgot-password`), verifikasi email, dll.
  - Verifikasi Nomor WhatsApp: Endpoint khusus verifikasi WA (`/verify-wa`) untuk menjaga validitas data komunikasi dengan pasien. 

### 3.3. Fitur Dashboard Admin (*Admin Workspace*)
Akses fitur khusus dengan rute `admin/*`, meliputi:

**A. Dashboard & Statistik**
- `GET /admin/statistic`: Laporan metrik operasional harian, pengunjung, atau performa dokter.
- `GET /admin/statistic/export`: Fitur mengunduh laporan ke file CSV.

**B. Manajemen Booking & Operasional (*Reception*)**
- **Daftar & Detail**: Menampilkan senarai *booking* masuk, mengubah status booking. 
- **Pembuatan Internal**: `admin/bookings/create` (Membuat janji secara walk-in atas nama pasien).
- **Proses Modifikasi**: `cancel`, `edit`, dan `reschedule/update` (memproses klaim perubahan waktu janji).
- **Billing / Payment**: Input konfirmasi pembayaran/penerimaan uang/metode pembayaran dari pasien (`admin/bookings/{id}/payment`).
- **Check-in Terpusat**: `admin/checkin/patiens` dan `admin/checkin/perform` (untuk pasien yang konfirmasi kedatangan ke resepsionis fisik).

**C. Manajemen Dokter (Doctor Roster Management)**
- **Doctor Profiles**: Menambah/Edit identitas Dokter.
- **Jadwal Permanen (Working Period)**: Pengaturan blok jadwal rutinitas mingguan dokter.
- **Override Cuti (Time-off)**: Pengaturan input hak cuti atau izin dokter (`admin/doctors/timeoff`) agar slot tanggal otomatis ditutup di portal Booking Pasien.
- **Lembur (Overtime)**: Penyesuaian shift tambahan dokter di luar jam reguler (`admin/doctors/overtime`).
- **Sistem Penguncian**: `admin/doctors/schedule/lock` & `unlock` - Admin dapat sewaktu-waktu membekukan jadwal dokter dari sistem.

**D. Manajemen Basis Pasien (CRM-Pasien)**
- Direktori pasien keseluruhan, pembuatan profil manual, hingga integrasi data (alamat & rekam medis).
- Detail riwayat janji temu yang pernah dihadiri *patient* tersebut.
- Update profile `admin/profile`.

---

## 4. Struktur Basis Data Relasional (Data Models)
Data yang diolah oleh sistem ini dirunutkan dalam entitas tabel relasional:

### 4.1 Master Data Dasar
- **Users**: Admin/Staf dan Sistem roles.
- **Wilayah Teritorial**: `provinces`, `cities`, `districts`, `villages` (berhubungan *cascade* satu sama lain).
- **Notifications**: Sistem Notifikasi (tipe, *scheduled/sent at*, attempt count, dan last error log).

### 4.2 Ranah Pengguna Layanan
- **Patients**: Penyimpan identitas inti berupa string ID rekam medis, Nama, NIK, Email, Nomor Telepon, Gender, Tanggal Lahir, dan Alamat Domisili.
- **Doctors**: Data tenaga medis berisi Nama, nomor SIP (Surat Izin Praktik), durasi pengalaman, status aktif, foto profil.

### 4.3 Ranah Jadwal & Roster (Doctor Constraints)
- **doctor_working_periods**: Logika hari dalam seminggu (*day_of_week*), durasi *start_time* s.d *end_time*.
- **doctor_time_off**: Jeda istirahat/izin berdasarkan hari kerja yang telah ditetapkan.
- **doctor_overtimes**: Opsi ekspansi jam kerja di hari tertentu.

### 4.4 Ranah Pendaftaran (Booking Flow)
- **bookings**: Data relasional sentral (ID dokter, ID Pasien). Meliputi `code`, *service type*, tanggal & jam dimulainya janji temu, *status*, dan *is_active*.
- **booking_cancellations**: Tabel *soft-fail* untuk mengaudit alasan pembatalan (baik dari pihak user/admin) dan siapa pelakunya.
- **booking_reschedules**: Tabel mutasi jika ada permohonan pemindahan jadwal kunjung (rekam waktu awal & baru).
- **booking_checkins**: Catatan faktual kedatangan fisik ke tempat kejadian (timestamp).
- **booking_payments**: Validasi tagihan bayar (jumlah, metode: *cash/transfer/cashless*, note tambahan).

---

## 5. Bisnis Proses Interaksi & State Machine
Setiap **Booking** memiliki perpindahan siklus status *finite state* sebagaimana berikut (asumsi dari struktur tabel & route):
1. **Dibuat (Created)** $\rightarrow$ Menunggu Konfirmasi/Hari-H.
2. **Dalam Proses Reschedule (Pending Reschedule)** $\rightarrow$ Membutuhkan persetujuan atau konfirmasi ulang pihak pasien/admin.
3. **Check-In (Hadir)** $\rightarrow$ Pasien sudah terdaftar/lapor fisik di klinik gigi bersiap mendapat layanan.
4. **Berbayar (Payment Completed)** $\rightarrow$ Sesi administratif selesai.
5. **Dibatalkan (Cancelled)** $\rightarrow$ Mengubah flag aktif booking menjadi non-aktif untuk me-release ketersediaan jadwal dokter.

---

## 6. Target Infrastruktur Teknologi (Tech Stack)
Aplikasi mengikuti arsitektur modern (*TALL / VILT stack*):
- **Backend**: Laravel Framework PHP 8.5+ (versi ^12.44) (Sistem *Job Batches*, Notifikasi Queues, Migrations *database_engine: mysql*).
- **Frontend App**: React 18 dipadukan dengan @inertiajs/react (versi ^2.3.4), memberikan sensasi akses layaknya *Single Page Application* tanpa kehilangan fitur routing Laravel.
- **Styling**: TailwindCSS mempermudah kontrol styling reaktif dalam lingkup fungsional *component*.
- **Testing environment**: Dilengkapi PestPHP dan PHPUnit (Unit & Feature).
- **Code Standards**: ESLint, Prettier terintergrasi.
- **CI/CD / Dev**: Laravel Sail (Dockerized).

---
*Generated based on actual routing patterns, package list, and schema definition of the workspace.*
