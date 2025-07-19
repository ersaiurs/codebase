'use client';

import { useRouter } from 'next/navigation';

export default function IntroJavascriptPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-violet-200">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-violet-700 text-3xl hover:text-violet-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full text-gray-800 overflow-y-auto">
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🧠 Pengenalan JavaScript</h1>

        <p className="text-lg mb-4">
          JavaScript adalah salah satu bahasa pemrograman yang paling populer di dunia. JavaScript sering digunakan untuk membuat website menjadi lebih hidup dan menarik bagi penggunanya. Tanpa JavaScript, website hanya akan menampilkan teks dan gambar saja seperti buku digital. Dengan JavaScript, kita bisa menambahkan fitur yang membuat pengguna dapat berinteraksi dengan website tersebut.
        </p>

        <p className="mb-4">
          Contohnya, saat kamu membuka website, kemudian menekan tombol dan warnanya berubah, atau muncul tulisan baru di layar, itu semua dibuat menggunakan JavaScript. Bahkan, game online sederhana seperti tebak angka, cari kata, atau animasi karakter juga dibuat menggunakan JavaScript.
        </p>

        <p className="mb-4">
          JavaScript juga digunakan untuk membuat website yang bisa merespon sesuai keinginan kita, seperti:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Menampilkan jam digital yang selalu bergerak mengikuti waktu nyata</li>
          <li>Memvalidasi data yang kita masukkan di form (contoh: memastikan email sudah benar sebelum dikirim)</li>
          <li>Membuat animasi bergerak atau gambar yang muncul saat halaman digulir ke bawah</li>
          <li>Membuat quiz interaktif dengan skor yang langsung muncul setelah dijawab</li>
        </ul>

        <p className="mb-4">
          JavaScript dapat dijalankan langsung di browser seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge tanpa perlu diinstal khusus. Inilah yang membuat JavaScript menjadi bahasa pemrograman wajib bagi seorang web developer. Hampir semua website di dunia menggunakan JavaScript, mulai dari website sekolah, media sosial, toko online, hingga portal berita.
        </p>

        <p className="mb-6">
          <strong>Kesimpulan:</strong> JavaScript adalah bahasa pemrograman yang membuat website menjadi interaktif dan dapat memberikan respon sesuai perintah pengguna. Belajar JavaScript akan membantu kita membuat website atau aplikasi yang tidak hanya bisa dilihat, tapi juga bisa digunakan untuk berinteraksi, bermain, belajar, dan bekerja.
        </p>

        <div className="text-right">
          <button
            onClick={() => router.push('/learning/syntax')}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Sintaks Dasar →
          </button>
        </div>
      </div>
    </div>
  );
}
