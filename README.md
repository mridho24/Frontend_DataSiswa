# Frontend Data Siswa

Aplikasi frontend untuk mengelola data siswa. Aplikasi dibuat menggunakan React, React Router, SWR, Axios, dan Tailwind CSS.

## Fitur

- Menampilkan daftar siswa
- Menambahkan data siswa
- Mengubah data siswa
- Menghapus data siswa dengan konfirmasi
- Menampilkan jumlah siswa terdaftar

## Prasyarat

- Node.js dan npm
- Backend Data Siswa berjalan di `http://localhost:5000`

## Instalasi

Dari folder frontend, jalankan:

```bash
npm install
```

## Menjalankan Aplikasi

Jalankan backend terlebih dahulu dari folder `backend`:

```bash
npm install
npm start
```

Setelah itu, jalankan frontend dari folder `frontend`:

```bash
npm start
```

Aplikasi dapat diakses melalui [http://localhost:3000](http://localhost:3000).

## Halaman Aplikasi

| Halaman      | URL         |
| ------------ | ----------- |
| Daftar siswa | `/`         |
| Tambah siswa | `/tambah`   |
| Edit siswa   | `/edit/:id` |

Frontend menggunakan API backend berikut:

```text
GET    http://localhost:5000/siswa
POST   http://localhost:5000/siswa
PUT    http://localhost:5000/siswa/:id
DELETE http://localhost:5000/siswa/:id
```

## Perintah Lain

```bash
npm test
npm run build
```

`npm run build` membuat hasil build production di folder `build`.
