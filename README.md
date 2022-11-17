# mern-product-store
Aplikasi dibuat dengan MERN dan Bootstrap v5.0

## Penjelasan singkat aplikasi
Aplikasi dapat melakukan operasi CRUD:
- Melihat daftar produk
- Melihat detail sebuah produk
- Membuat produk
- Edit produk
- Menghapus produk

Aplikasi toko produk juga dapat:
- Mencari produk berdasarkan nama produk dan kategori produk
- Men-support pagination
- Menerima input berupa file gambar untuk ditampilkan di aplikasi

### Setting MongoDB supaya dapat mencari berdasarkan nama produk
Pada collection yang digunakan, perlu menambahkan index dengan field: `name` dan type: `text`
