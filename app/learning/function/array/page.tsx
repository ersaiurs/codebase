'use client';

import { useRouter } from 'next/navigation';

export default function ArraysLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning/');
  };

  const handleBackToFunctions = () => {
    router.push('/learning/function/functions');
  };

  const handleNext = () => {
    router.push('/games/');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">📚 Array</h1>

        <p className="text-lg mb-4">
          Array adalah variabel yang dapat menyimpan banyak data sekaligus di dalam satu nama. 
          Misalnya kamu memiliki daftar nama teman sekelasmu, semua bisa disimpan di dalam satu array.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">💡 Contoh Kehidupan Nyata</h2>
        <p className="mb-4">
          Array seperti rak buku di perpustakaan. Setiap rak punya nomor, dan di dalamnya ada buku-buku yang berbeda.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📌 Contoh Array di JavaScript</h2>

        <pre className="bg-gray-100 rounded p-4 text-left mb-4 overflow-x-auto">
{`let buah = ["apel", "pisang", "jeruk"];

console.log(buah[0]); // menampilkan "apel"
console.log(buah[1]); // menampilkan "pisang"
console.log(buah[2]); // menampilkan "jeruk"
`}
        </pre>

        <p className="mb-6">
          Pada contoh di atas, kita membuat array bernama <code>buah</code> yang menyimpan tiga data: "apel", "pisang", dan "jeruk". Kita bisa memanggil setiap data dengan nomor urutnya yang dimulai dari 0.
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleBackToFunctions}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base"
          >
            ← Materi Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}
