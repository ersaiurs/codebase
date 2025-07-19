'use client';

import { useRouter } from 'next/navigation';

export default function ConditionalsPage() {
  const router = useRouter();

  const handleBackToConditionals = () => {
    router.push('/learning/conditionals');
  };

  const handleBackToLearning = () => {
    router.push('/learning');
  };

  const handleFunctions = () => {
    router.push('/learning/function/functions');
  };

  const handleArray = () => {
    router.push('/learning/function/array');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-violet-200 relative">
      {/* Tombol Kembali di pojok kiri atas ke /learning */}
      <button
        onClick={handleBackToLearning}
        className="absolute top-4 left-4 text-violet-700 text-3xl hover:text-violet-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full text-gray-800 text-center">
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🧩 Fungsi & Array</h1>

        <ul className="list-disc list-inside text-left mb-6 space-y-2">
          <li>
            <strong>Fungsi (Functions):</strong> 
            Fungsi adalah kumpulan kode yang dibuat untuk melakukan tugas tertentu. Dengan fungsi, kita tidak perlu menulis ulang kode yang sama berulang-ulang. Contohnya seperti resep masakan yang bisa digunakan kapan saja.
          </li>
          <li>
            <strong>Array:</strong> 
            Array adalah variabel khusus yang dapat menyimpan banyak data sekaligus di dalam satu nama. Misalnya, daftar nama teman sekelasmu dapat disimpan di dalam satu array.
          </li>
        </ul>

        <p className="mb-6">
          Yuk, pilih materi di bawah ini untuk melanjutkan belajar hari ini:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <button
            onClick={handleFunctions}
            className="bg-violet-600 text-white px-6 py-4 rounded-2xl hover:bg-violet-700 transition text-lg font-semibold shadow"
          >
            🔍 Belajar Fungsi
          </button>

          <button
            onClick={handleArray}
            className="bg-violet-600 text-white px-6 py-4 rounded-2xl hover:bg-violet-700 transition text-lg font-semibold shadow"
          >
            📚 Belajar Array
          </button>

          {/* Tombol Kembali di bawah grid, center, ke /learning/conditionals */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              onClick={handleBackToConditionals}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base mt-4"
            >
              ← Materi Sebelumnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
