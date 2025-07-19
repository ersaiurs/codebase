'use client';

import { useRouter } from 'next/navigation';

export default function OperatorsLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning');
  };

  const handleBackToVariables = () => {
    router.push('/learning/variables');
  };

  const handleNext = () => {
    router.push('/learning/conditionals');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">➕ Operator di JavaScript</h1>

        <p className="text-lg mb-4">
          Operator adalah simbol atau tanda khusus yang digunakan untuk melakukan operasi atau perhitungan pada satu atau lebih nilai (variabel).
        </p>

        <p className="mb-4">
          Contohnya sama seperti tanda <strong>+</strong> dan <strong>-</strong> di pelajaran matematika. Namun di JavaScript, operator tidak hanya untuk menghitung angka, tapi juga untuk membandingkan nilai atau membuat logika.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">🔢 Operator Aritmatika</h2>

	<p className="mb-4">
          Operator aritmatika digunakan untuk <strong>menghitung angka</strong>. Berikut contohnya:
        </p>

        <table className="w-full mb-6 border border-gray-300">
          <thead className="bg-violet-200">
            <tr>
              <th className="py-2 border border-gray-300">Operator</th>
              <th className="py-2 border border-gray-300">Nama</th>
              <th className="py-2 border border-gray-300">Contoh</th>
              <th className="py-2 border border-gray-300">Hasil</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border border-gray-300 text-center">+</td>
              <td className="py-2 border border-gray-300">Penjumlahan</td>
              <td className="py-2 border border-gray-300">5 + 3</td>
              <td className="py-2 border border-gray-300">8</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">-</td>
              <td className="py-2 border border-gray-300">Pengurangan</td>
              <td className="py-2 border border-gray-300">10 - 4</td>
              <td className="py-2 border border-gray-300">6</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">*</td>
              <td className="py-2 border border-gray-300">Perkalian</td>
              <td className="py-2 border border-gray-300">2 * 3</td>
              <td className="py-2 border border-gray-300">6</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">/</td>
              <td className="py-2 border border-gray-300">Pembagian</td>
              <td className="py-2 border border-gray-300">8 / 2</td>
              <td className="py-2 border border-gray-300">4</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">%</td>
              <td className="py-2 border border-gray-300">Modulus (Sisa Bagi)</td>
              <td className="py-2 border border-gray-300">7 % 3</td>
              <td className="py-2 border border-gray-300">1</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">⚖️ Operator Perbandingan</h2>

	<p className="mb-4">
          Operator perbandingan digunakan untuk <strong>membandingkan dua nilai</strong>. Hasilnya akan <strong>true (benar)</strong> atau <strong>false (salah)</strong>.
        </p>

        <table className="w-full mb-6 border border-gray-300">
          <thead className="bg-violet-200">
            <tr>
              <th className="py-2 border border-gray-300">Operator</th>
              <th className="py-2 border border-gray-300">Keterangan</th>
              <th className="py-2 border border-gray-300">Contoh</th>
              <th className="py-2 border border-gray-300">Hasil</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border border-gray-300 text-center">==</td>
              <td className="py-2 border border-gray-300">Sama dengan (nilai)</td>
              <td className="py-2 border border-gray-300">5 == "5"</td>
              <td className="py-2 border border-gray-300">true</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">===</td>
              <td className="py-2 border border-gray-300">Sama dengan (nilai & tipe)</td>
              <td className="py-2 border border-gray-300">5 === "5"</td>
              <td className="py-2 border border-gray-300">false</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">!=</td>
              <td className="py-2 border border-gray-300">Tidak sama dengan (nilai)</td>
              <td className="py-2 border border-gray-300">5 != 3</td>
              <td className="py-2 border border-gray-300">true</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">&gt;</td>
              <td className="py-2 border border-gray-300">Lebih dari</td>
              <td className="py-2 border border-gray-300">7 &gt; 5</td>
              <td className="py-2 border border-gray-300">true</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">&lt;</td>
              <td className="py-2 border border-gray-300">Kurang dari</td>
              <td className="py-2 border border-gray-300">3 &lt; 4</td>
              <td className="py-2 border border-gray-300">true</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">🔀 Operator Logika</h2>

	<p className="mb-4">
          Operator logika digunakan untuk membuat <strong>kondisi yang lebih dari satu</strong>. Digunakan dalam percabangan dan perulangan.
        </p>

        <table className="w-full mb-6 border border-gray-300">
          <thead className="bg-violet-200">
            <tr>
              <th className="py-2 border border-gray-300">Operator</th>
              <th className="py-2 border border-gray-300">Nama</th>
              <th className="py-2 border border-gray-300">Contoh</th>
              <th className="py-2 border border-gray-300">Hasil</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border border-gray-300 text-center">&amp;&amp;</td>
              <td className="py-2 border border-gray-300">AND (dan)</td>
              <td className="py-2 border border-gray-300">true && false</td>
              <td className="py-2 border border-gray-300">false</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">||</td>
              <td className="py-2 border border-gray-300">OR (atau)</td>
              <td className="py-2 border border-gray-300">true || false</td>
              <td className="py-2 border border-gray-300">true</td>
            </tr>
            <tr>
              <td className="py-2 border border-gray-300 text-center">!</td>
              <td className="py-2 border border-gray-300">NOT (kebalikan)</td>
              <td className="py-2 border border-gray-300">!true</td>
              <td className="py-2 border border-gray-300">false</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-6">
          Dengan memahami operator aritmatika, perbandingan, dan logika, kamu dapat membuat program yang bisa melakukan perhitungan, membandingkan nilai, dan mengambil keputusan logika dengan mudah.
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleBackToVariables}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base"
          >
            ← Materi Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Percabangan & Perulangan →
          </button>
        </div>
      </div>
    </div>
  );
}
