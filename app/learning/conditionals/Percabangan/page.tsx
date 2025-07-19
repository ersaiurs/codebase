'use client';

import { useRouter } from 'next/navigation';

export default function ConditionalsLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning/conditionals');
  };

  const handleNext = () => {
    router.push('/learning/conditionals/Perulangan');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🔀 Percabangan (Conditionals)</h1>

        <p className="text-lg mb-4">
          Percabangan memungkinkan program untuk mengambil keputusan berdasarkan kondisi tertentu. Sama seperti di kehidupan sehari-hari saat kita memutuskan sesuatu.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">💡 Contoh Kehidupan Nyata</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Jika hujan, maka bawa payung.</li>
          <li>Jika nilai ujian bagus, kamu dapat hadiah.</li>
          <li>Jika lapar, maka makan. Jika tidak lapar, istirahat.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📌 Jenis Percabangan di JavaScript</h2>

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
              <td className="py-2 border border-gray-300">if</td>
              <td className="py-2 border border-gray-300">
{`if (nilai >= 80) {
  console.log("Bagus!");
}`}
              </td>
              <td className="py-2 border border-gray-300">Jika kondisi benar, maka kode di dalam if dijalankan.</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300">if...else</td>
              <td className="py-2 border border-gray-300">
{`if (nilai >= 80) {
  console.log("Bagus!");
} else {
  console.log("Belajar lagi ya.");
}`}
              </td>
              <td className="py-2 border border-gray-300">Jika kondisi benar jalankan if, jika salah jalankan else.</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300">else if</td>
              <td className="py-2 border border-gray-300">
{`if (nilai >= 90) {
  console.log("Sangat Bagus!");
} else if (nilai >= 80) {
  console.log("Bagus!");
} else {
  console.log("Belajar lagi ya.");
}`}
              </td>
              <td className="py-2 border border-gray-300">Digunakan jika ada banyak kondisi berbeda.</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300">switch</td>
              <td className="py-2 border border-gray-300">
{`let hari = "Senin";
switch(hari) {
  case "Senin":
    console.log("Hari pertama sekolah.");
    break;
  case "Jumat":
    console.log("Hari Jumat penuh berkah.");
    break;
  default:
    console.log("Hari lainnya.");
}`}
              </td>
              <td className="py-2 border border-gray-300">Memilih salah satu dari banyak pilihan nilai.</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-6">
          Dengan percabangan, programmu dapat membuat keputusan otomatis sesuai kondisi yang terjadi.
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
            Lanjut ke Perulangan →
          </button>
        </div>
      </div>
    </div>
  );
}
