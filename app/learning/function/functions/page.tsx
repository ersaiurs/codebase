'use client';

import { useRouter } from 'next/navigation';

export default function FunctionsLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning/');
  };

  const handleBackToFunction = () => {
    router.push('/learning/function');
  };


  const handleNext = () => {
    router.push('/learning/function/array');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-violet-200 relative">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-violet-700 text-3xl hover:text-violet-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full text-gray-800 overflow-y-auto">
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🔍 Fungsi (Functions)</h1>

        <p className="text-lg mb-4">
          Fungsi adalah kumpulan kode yang dibuat untuk melakukan tugas tertentu. 
          Fungsi membantu kita agar tidak menulis kode yang sama berulang-ulang.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">💡 Contoh Kehidupan Nyata</h2>
        <p className="mb-4">
          Fungsi itu seperti resep masakan. Jika ingin membuat mie goreng, kamu tinggal mengikuti resep tanpa harus mengingat langkah satu per satu setiap saat.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📌 Contoh Fungsi di JavaScript</h2>

        <pre className="bg-gray-100 rounded p-4 text-left mb-4 overflow-x-auto">
{`function sapa() {
  console.log("Halo, selamat datang!");
}

sapa(); // memanggil fungsi
`}
        </pre>

        <p className="mb-6">
          Pada contoh di atas, kita membuat fungsi <code>sapa()</code> yang akan menampilkan "Halo, selamat datang!" ketika dipanggil.
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleBackToFunction}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base"
          >
            ← Materi Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Array →
          </button>
        </div>
      </div>
    </div>
  );
}
