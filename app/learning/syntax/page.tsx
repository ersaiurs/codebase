'use client';

import { useRouter } from 'next/navigation';

export default function SyntaxLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning/');
  };

  const handleBackToIntro = () => {
    router.push('/learning/intro');
  };

  const handleNext = () => {
    router.push('/learning/variables');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">📝 Sintaks Dasar JavaScript</h1>

        <p className="text-lg mb-4">
          Sintaks adalah <strong>aturan penulisan kode</strong> dalam bahasa pemrograman. Jika kita menulis kode dengan aturan yang salah, komputer tidak akan bisa membaca atau menjalankan perintah yang kita buat.
        </p>

        <p className="mb-4">
          Sama seperti saat menulis kalimat bahasa Indonesia harus menggunakan huruf kapital, tanda titik, dan koma di tempat yang benar, dalam JavaScript juga ada aturan penulisannya sendiri.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📌 Contoh Sintaks Dasar</h2>

        <pre className="bg-gray-100 p-4 rounded mb-4">
{`console.log("Halo, Dunia!");`}
        </pre>

        <p className="mb-4">
          Kode di atas akan menampilkan teks <strong>Halo, Dunia!</strong> di konsol. <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">console.log</code> adalah perintah untuk menampilkan atau mencetak sesuatu ke layar konsol.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">💡 Penjelasan Baris Kode</h2>

        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>console</strong> → objek bawaan di JavaScript yang digunakan untuk menampilkan atau menyimpan data saat program dijalankan.</li>
          <li><strong>log</strong> → fungsi (perintah) untuk mencetak atau menampilkan informasi ke konsol.</li>
          <li><strong>("Halo, Dunia!")</strong> → teks yang ingin kita tampilkan, disebut juga string. String ditulis dengan tanda kutip (" " atau ' ').</li>
          <li><strong>;</strong> → tanda titik koma untuk mengakhiri setiap baris perintah di JavaScript, agar program lebih rapi dan jelas batas perintahnya.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">⚠️ Aturan Penting Sintaks</h2>

        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>JavaScript <strong>case sensitive</strong>, artinya huruf besar dan kecil dibedakan. Contoh <code>Nama</code> dan <code>nama</code> adalah dua variabel yang berbeda.</li>
          <li>Setiap perintah ditulis di baris baru dan sebaiknya diakhiri dengan titik koma <code>;</code>.</li>
          <li>Komentar digunakan untuk memberi catatan di kode, tidak akan dijalankan oleh komputer:
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li><code>// komentar satu baris</code></li>
              <li><code>/* komentar banyak baris */</code></li>
            </ul>
          </li>
        </ul>

        <p className="mb-6">
          Dengan memahami sintaks dasar, kita bisa menulis program JavaScript dengan benar dan mudah dipahami oleh komputer maupun programmer lain.
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleBackToIntro}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base"
          >
            ← Materi Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Variabel & Tipe Data →
          </button>
        </div>
      </div>
    </div>
  );
}
