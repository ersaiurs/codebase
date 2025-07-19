'use client';

import { useRouter } from 'next/navigation';

export default function LoopsLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning/conditionals/Percabangan');
  };

  const handleNext = () => {
    router.push('/learning/function');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🔁 Perulangan (Loops)</h1>

        <p className="text-lg mb-4">
          Perulangan digunakan untuk menjalankan kode yang sama beberapa kali. Bayangkan kamu ingin menulis “Aku suka coding” sebanyak 10 kali – dengan perulangan, kamu hanya perlu satu baris perintah, bukan mengetik 10 kali.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📌 Jenis Perulangan di JavaScript</h2>

        <table className="w-full mb-6 border border-gray-300">
          <thead className="bg-violet-200">
            <tr>
              <th className="py-2 border border-gray-300">Jenis</th>
              <th className="py-2 border border-gray-300">Contoh Kode</th>
              <th className="py-2 border border-gray-300">Penjelasan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border border-gray-300">for</td>
              <td className="py-2 border border-gray-300">
{`for (let i = 1; i <= 5; i++) {
  console.log(i);
}`}
              </td>
              <td className="py-2 border border-gray-300">Mengulang dengan jumlah pasti, contoh mencetak angka 1–5.</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300">while</td>
              <td className="py-2 border border-gray-300">
{`let i = 1;
while (i <= 3) {
  console.log(i);
  i++;
}`}
              </td>
              <td className="py-2 border border-gray-300">Mengulang selama kondisi bernilai true, cocok jika jumlah pengulangan belum pasti.</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300">do...while</td>
              <td className="py-2 border border-gray-300">
{`let i = 1;
do {
  console.log(i);
  i++;
} while (i <= 3);`}
              </td>
              <td className="py-2 border border-gray-300">Mirip while, tetapi kode dijalankan sekali dulu sebelum mengecek kondisi.</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-6">
          Dengan perulangan, program menjadi lebih pendek, rapi, dan efisien. Kamu akan sering menggunakannya saat membuat , animasi, atau quiz yang berulang.
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base"
          >
            ← Materi Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Fungsi & Array →
          </button>
        </div>
      </div>
    </div>
  );
}
