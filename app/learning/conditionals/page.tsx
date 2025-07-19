'use client';

import { useRouter } from 'next/navigation';

export default function ConditionalsPage() {
  const router = useRouter();

  const handleBackToOperators = () => {
    router.push('/learning/operators');
  };

  const handleBackToLearning = () => {
    router.push('/learning');
  };

  const handlePercabangan = () => {
    router.push('/learning/conditionals/Percabangan');
  };

  const handlePerulangan = () => {
    router.push('/learning/conditionals/Perulangan');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🧩 Struktur Kontrol</h1>

        <p className="text-lg mb-6">
          <strong>Struktur kontrol</strong> adalah cara kita mengatur jalannya program agar dapat mengambil keputusan dan mengulang perintah secara otomatis.
          <br /><br />
          Dalam kehidupan sehari-hari, kita juga melakukan struktur kontrol tanpa sadar. Contohnya:
        </p>

        <ul className="list-disc list-inside text-left mb-6 space-y-2">
          <li>
            <strong>Percabangan (Conditionals):</strong> 
            Jika hujan, maka pakai payung. Jika tidak hujan, tetap jalan tanpa payung.
          </li>
          <li>
            <strong>Perulangan (Loops):</strong> 
            Menyapu lantai berkali-kali sampai bersih atau mengerjakan soal matematika 10 kali.
          </li>
        </ul>

        <p className="mb-6">
          Di JavaScript, kita akan belajar <strong>percabangan</strong> untuk membuat keputusan dan <strong>perulangan</strong> untuk melakukan tugas berulang dengan mudah dan efisien.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <button
            onClick={handlePercabangan}
            className="bg-violet-600 text-white px-6 py-4 rounded-2xl hover:bg-violet-700 transition text-lg font-semibold shadow"
          >
            🔀 Belajar Percabangan
          </button>

          <button
            onClick={handlePerulangan}
            className="bg-violet-600 text-white px-6 py-4 rounded-2xl hover:bg-violet-700 transition text-lg font-semibold shadow"
          >
            🔁 Belajar Perulangan
          </button>

          {/* Tombol Kembali di bawah grid, center, ke /learning/operators */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              onClick={handleBackToOperators}
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
