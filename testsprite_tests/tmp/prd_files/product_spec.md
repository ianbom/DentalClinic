# Spesifikasi Produk Website Klinik Gigi

## Gambaran Umum Produk
- Website klinik gigi dengan dua sisi utama: publik (pasien) dan admin (staff klinik).
- Tujuan utama: memudahkan pasien melihat informasi klinik dan melakukan booking, serta memudahkan admin mengelola jadwal, pasien, dokter, pembayaran, dan notifikasi.
- Bahasa UI: Indonesia; format tanggal/waktu lokal (WIB); mata uang IDR.

## Peran & Akses
- Pasien (publik): akses semua halaman umum, booking, cek booking, batal/check-in via kode.
- Admin (authenticated): akses dashboard, statistik, manajemen booking, pasien, dokter, jadwal, serta input pembayaran.

## Struktur Navigasi Publik
- Beranda
- Tentang (profil klinik, dokter)
- Layanan
- Dokter (list + detail)
- Booking (multi-step)
- Cek Booking
- Floating WhatsApp (kontak cepat)

## Halaman Publik & Fungsionalitas
### Beranda
- Hero, CTA booking, highlight layanan, statistik singkat, testimonial/keunggulan, CTA WhatsApp.

### Tentang
- Deskripsi klinik, nilai/visi, tim dokter.

### Layanan
- Daftar layanan/tindakan yang tersedia.

### Dokter
- List dokter dengan foto, spesialisasi, ringkasan.
- Detail dokter: profil lengkap, foto, keahlian, CTA booking.

### Booking (alur bertahap)
- Langkah 1: Pilih dokter & layanan.
- Langkah 2: Pilih tanggal & slot waktu (berbasis jadwal dokter + ketersediaan).
- Langkah 3: Isi data pasien (NIK, nama, gender, tanggal lahir, alamat, nomor WA, no. rekam medis opsional).
- Langkah 4: Review (ringkasan dokter, jadwal, layanan, data pasien).
- Langkah 5: Sukses (menampilkan kode booking dan instruksi).

### Cek Booking
- Input kode/identitas untuk mencari booking.
- Menampilkan status booking, detail jadwal, info pasien, dan status pembayaran jika ada.

### Check-in Publik
- Endpoint untuk check-in pasien menggunakan kode booking.

### Batalkan Booking (Publik)
- Endpoint untuk pembatalan booking oleh pasien, dengan alasan opsional.

## Admin — Modul & Fitur
### Dashboard
- Ringkasan metrik: total booking, total pasien, booking hari ini, revenue, top layanan.
- Grafik tren (harian/bulanan).
- Data pasien terbaru.
- Akses cepat ke detail booking/pasien/dokter.

### Statistik
- Statistik booking dan revenue per periode.
- Filter tanggal.
- Export CSV.

### Manajemen Booking
#### Header
- Judul: “Manajemen Booking”.
- Deskripsi: “Kelola daftar booking, jadwal, dan status pasien di sini.”
- Tombol “Tambah Booking Baru” (CTA).

#### Tab
- “Daftar” (aktif).
- “Kalender” (placeholder/tautan, belum ada detail navigasi).

#### Filter & Pencarian
- Pencarian teks: “Cari kode, nama, atau telepon...”.
- Filter tanggal (date input).
- Filter dokter (select).
- Filter status (Confirmed, Checked In, Cancelled, No Show).
- Tombol Clear muncul bila ada filter aktif.

#### Tabel Booking
- Kolom: No, Kode, Pasien (nama + telepon), Dokter (diringkas 2 kata pertama), Tanggal & Jam, Dipesan pada, Service, Status, Pembayaran, Aksi.
- Status badge berdasar status booking.
- Pembayaran: jika ada tampil nominal + metode, jika belum “Belum bayar”.
- Expandable row (opsional): menampilkan NIK, alamat, gender.
- Sorting: Pasien, Tanggal & Jam, Dipesan pada.
- Aksi:
	- Expand (toggle detail).
	- Input pembayaran (icon payments).
	- Lihat detail booking.

#### Pagination
- Prev/Next + nomor halaman (dengan ellipsis).
- Info “Menampilkan X - Y dari Z booking”.

### Detail Booking (Admin)
#### Breadcrumb
- Kembali → Daftar Booking → Detail Booking.

#### Header
- “Detail Booking”.

#### Status Card
- Kode booking (format #XXXX).
- Status badge warna:
	- confirmed (biru), checked_in (hijau), cancelled (merah), no_show (abu), completed (emerald), default (amber).
- Aksi:
	- Check-in (hanya jika status confirmed).
	- Batalkan (hanya jika status confirmed).
	- Reschedule (status confirmed/pending).
	- Edit (selalu tersedia).
- Dialog konfirmasi check-in & cancel (dengan tombol Ya/Batal).

#### Schedule Card
- Informasi dokter (foto, nama, spesialisasi).
- Tanggal booking.
- Jam booking.

#### Timeline Status
- Step: Booking Dibuat (selalu).
- Booking Dikonfirmasi / Dibatalkan.
- Pasien Check-in.
- Selesai.
- Jika batal: timeline check-in/selesai tidak ditampilkan.
- Jika reschedule: daftar riwayat jadwal lama → jadwal baru.

#### Notification History
- Collapsible; jumlah notifikasi ditampilkan.
- Item berisi:
	- Status (sent/failed/pending) dengan badge warna.
	- Channel (whatsapp/email/notifications).
	- Tipe notifikasi.
	- Waktu dibuat.
	- Payload (isi pesan).
	- Detail penerima, jadwal kirim, waktu terkirim, error log (jika gagal).

#### Patient Info Card
- Nama, NIK, gender, tanggal lahir, alamat, no. rekam medis, layanan.
- Nomor WhatsApp + tombol copy + tombol “Hubungi via WA”.

#### Payment Card
- Jika sudah bayar: nominal, metode, catatan, label “Sudah Dibayar”.
- Jika belum: status kosong “Belum ada data pembayaran”.

### Input Pembayaran (Modal)
- Form:
	- Nominal (format Rupiah; input hanya angka).
	- Metode: Tunai, Transfer Bank, QRIS, Kartu Debit, Kartu Kredit.
	- Catatan (opsional).
- Dapat edit pembayaran yang sudah ada (prefill).
- Aksi: Batal / Simpan atau Update (loading “Menyimpan...”).
- Endpoint: /admin/bookings/{id}/payment.

### Manajemen Pasien
- List pasien, pencarian/filter.
- Detail pasien (termasuk riwayat booking).
- Create/Edit pasien.
- Check-in pasien langsung dari admin.

### Manajemen Dokter & Jadwal
- List dokter (foto, spesialisasi).
- Detail dokter dan jadwal kerja.
- CRUD doctor working periods, time off, overtime.
- Lock/unlock jadwal dokter.

## Data Model (Inti)
### patients
- NIK, nama, gender, tanggal lahir, alamat, nomor WA, no. rekam medis.

### doctors
- Nama, spesialisasi, foto, jadwal kerja.

### bookings
- Kode booking.
- Pasien, dokter, layanan.
- Tanggal, waktu mulai/akhir.
- Status (pending/confirmed/checked_in/cancelled/no_show/completed).
- Catatan.

### booking_payments
- booking_id, amount, payment_method, note.

### booking_checkins
- booking_id, checked_in_at.

### booking_cancellations
- booking_id, cancelled_by (admin/pasien), reason, cancelled_at.

### booking_reschedules
- booking_id, old_date/time, new_date/time, created_at.

### doctor_working_periods / doctor_time_off / doctor_overtimes
- Memetakan jam kerja, cuti, lembur.

### notifications
- channel (whatsapp/email), type, recipient, payload, status (sent/failed/pending), scheduled_at, sent_at, last_error.

## Status Booking & Logika
- Pending: dibuat namun belum dikonfirmasi.
- Confirmed: booking telah dikonfirmasi.
- Checked In: pasien hadir dan check-in berhasil.
- Cancelled: dibatalkan (admin/pasien).
- No Show: pasien tidak hadir.
- Completed: proses selesai (ditandai pasca check-in atau proses internal).

## Notifikasi & Integrasi
- Channel utama: WhatsApp (Fonnte API).
- Tipe pesan: konfirmasi booking, reminder, reschedule, pembatalan, check-in, verifikasi WA, follow-up pasca check-in.
- Notifikasi tersimpan lengkap (payload, waktu dijadwalkan, status).

## Validasi & Input Kritis
- NIK sebagai identitas utama pasien.
- Nomor WhatsApp dipakai untuk notifikasi dan kontak.
- Booking wajib memilih dokter, tanggal, waktu, layanan.
- Pembayaran wajib nominal dan metode.

## Non-Functional Requirements
- Responsif untuk mobile dan desktop.
- Format tanggal/waktu Indonesia (WIB).
- Format mata uang Rupiah dengan pemisah ribuan.
- Akses admin wajib autentikasi.
