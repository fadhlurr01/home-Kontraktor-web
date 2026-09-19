# CONTRACTOR.HUB - React.js Web Application

Aplikasi web modern berpresisi tinggi untuk kontraktor konstruksi, biro arsitektur, dan studio desain interior. Dibangun menggunakan **React 18**, **Vite**, **Three.js (3D WebGL)**, dan **Lucide Icons**, serta telah disesuaikan khusus untuk **deployment ke cPanel**.

---

## 🚀 Menjalankan Secara Lokal (Development)

Untuk menjalankan server pengembangan lokal:

```bash
npm run dev
```

Buka URL lokal yang muncul di terminal (biasanya `http://localhost:5173`) di browser Anda.

---

## 📦 Build untuk Production

Untuk mengompilasi aplikasi menjadi file statis siap upload ke server:

```bash
npm run build
```

Hasil build akan tersimpan di dalam folder `dist/`.

---

## 🌐 Panduan Lengkap Upload ke cPanel

Folder `dist/` sudah otomatis memuat file `.htaccess` khusus Apache cPanel dan semua file aset JS/CSS menggunakan **relative base path (`./`)**, sehingga aman di-upload baik di root domain maupun di subfolder / subdomain cPanel.

### Langkah-langkah Upload ke cPanel:

1. **Build Aplikasi**:
   Jalankan perintah berikut di terminal:
   ```bash
   npm run build
   ```
2. **Kompres Folder `dist`**:
   - Masuk ke dalam folder `dist/`.
   - Pilih semua file di dalamnya (`.htaccess`, `index.html`, dan folder `assets/`).
   - Klik kanan > **Send to** > **Compressed (zipped) folder** (atau buat file `dist.zip`).
3. **Buka cPanel**:
   - Login ke akun cPanel hosting Anda.
   - Buka menu **File Manager**.
   - Masuk ke direktori target:
     - Jika untuk domain utama: buka folder `public_html/`
     - Jika untuk subdomain / subdirektori: buka folder yang sesuai (misal `public_html/kontraktor/`)
4. **Upload & Extract**:
   - Klik tombol **Upload** di bagian atas cPanel File Manager.
   - Pilih file `dist.zip` yang telah dibuat.
   - Setelah upload selesai (100% hijau), kembali ke File Manager.
   - Klik kanan pada `dist.zip` lalu pilih **Extract**.
5. **Pastikan File Tersembunyi (Dotfiles) Terlihat**:
   - Di pojok kanan atas File Manager cPanel, klik **Settings**.
   - Centang **Show Hidden Files (dotfiles)** lalu klik **Save**.
   - Pastikan file `.htaccess` terlihat di dalam folder `public_html/`. File ini penting agar URL rewrite dan performa kompresi Gzip aktif di Apache.
6. **Selesai!**
   Buka domain website Anda di browser. Website CONTRACTOR.HUB React Anda sudah aktif live.

---

## 🛠️ Fitur Utama Aplikasi

- **3D Structural WebGL Hero**: Simulasi 3D balok baja WF, scaffolding, dan kinetic physics menggunakan Three.js dengan 4 filter model (Semuanya, Interior, Arsitek, Sipil).
- **3D BIM Construction Inspector**: Viewer BIM 3D interaktif dengan toggle layer struktur beton rebar, instalasi MEP plumbing, fasad arsitektur kaca, serta wireframe & auto-rotate.
- **Kalkulator RAB m²**: Perhitungan estimasi biaya real-time dengan multiplier kategori bangunan, jumlah lantai, indeks wilayah, spesifikasi mutu material, serta konversi mata uang dinamis (IDR / USD).
- **Interactive Before/After Slider**: Slider komparasi foto awal galian/raw concrete vs hasil finishing luxury dengan drag interaktif.
- **Site Weather & Radar K3**: Monitoring parameter cuaca real-time dengan simulasi badai ekstrem dan validasi izin kerja (Work Permit) SMK3 Permenaker.
- **Matriks Armada Alat Berat**: Katalog kesiapan mobilisasi crane, excavator, concrete pump lengkap dengan modal penerbitan tiket disposisi digital.
- **Showcase 15 Template Portofolio**: Katalog template dengan filter kategori, modal live iframe sandbox multi-device (Desktop, Tablet, Mobile), dan modal technical spec sheet.
- **Bilingual i18n (ID / EN)**: Dukungan penuh dua bahasa (Bahasa Indonesia & English).
- **Dark / Light Theme**: Tema Techno-Architectural Dark (default) dan Concrete Light Mode.
