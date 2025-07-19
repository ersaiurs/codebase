'use client';

import { useRouter } from 'next/navigation';

export default function VariablesLessonPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/learning');
  };

    const handleBackToSyntax = () => {
    router.push('/learning/syntax');
    };

  const handleNext = () => {
    router.push('/learning/operators');
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
        <h1 className="text-3xl font-bold text-violet-700 mb-4">🔢 Variabel dan Tipe Data</h1>

        <p className="text-lg mb-4">
          Variabel adalah <strong>tempat untuk menyimpan data</strong> di dalam program. Kamu bisa membayangkan variabel seperti kotak penyimpanan yang memiliki nama, sehingga kita bisa tahu isi kotak tersebut apa dan bisa memakainya kapan saja.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📦 Contoh Variabel</h2>

        <pre className="bg-gray-100 p-4 rounded mb-4">
{`let nama = "Ersa";
const umur = 13;
var sekolah = "SMP";`}
        </pre>

        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>let</strong> digunakan jika data di dalam variabel bisa diubah nanti.</li>
          <li><strong>const</strong> digunakan jika data di dalam variabel tidak akan diubah sama sekali.</li>
          <li><strong>var</strong> adalah cara lama sebelum tahun 2015, sekarang lebih sering menggunakan <code>let</code> atau <code>const</code>.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">💡 Mengapa Variabel Penting?</h2>

        <p className="mb-4">
          Dengan variabel, kita dapat menyimpan data seperti nama pemain, skor dalam game, atau jawaban quiz, kemudian menggunakannya kembali di bagian lain program kita.
        </p>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">🔍 Tipe Data di JavaScript</h2>

        <p className="mb-4">
          Tipe data adalah jenis data yang disimpan dalam variabel. Berikut beberapa tipe data yang sering digunakan:
        </p>

        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>String</strong>: berisi teks atau kalimat. Ditulis dengan tanda kutip (" " atau ' ').<br/>
            Contoh: <code>let nama = "Lucas";</code>
          </li>
          <li><strong>Number</strong>: berisi angka, baik bulat maupun desimal.<br/>
            Contoh: <code>let umur = 12;</code> atau <code>let berat = 35.5;</code>
          </li>
          <li><strong>Boolean</strong>: berisi nilai benar atau salah (true atau false).<br/>
            Contoh: <code>let lulus = true;</code>
          </li>
          <li><strong>Array</strong>: kumpulan data dalam satu variabel, seperti rak berisi banyak buku.<br/>
            Contoh: <code>let buah = ["apel", "jeruk", "pisang"];</code>
          </li>
          <li><strong>Object</strong>: kumpulan data yang memiliki nama properti.<br/>
            Contoh:
            <pre className="bg-gray-100 p-2 rounded mt-2">
{`let siswa = {
  nama: "Dina",
  umur: 14,
  kelas: "8B"
};`}
            </pre>
          </li>
          <li><strong>Undefined</strong>: variabel sudah dibuat tapi belum diisi.</li>
          <li><strong>Null</strong>: variabel sudah dibuat, isinya kosong dengan sengaja.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-violet-600 mt-6 mb-2">📝 Kesimpulan</h2>

        <p className="mb-6">
          Variabel adalah <strong>nama kotak penyimpanan data</strong> dalam program, sedangkan tipe data menjelaskan <strong>jenis data apa yang disimpan di dalam kotak tersebut</strong>. Dengan variabel dan tipe data, kita dapat membuat program yang rapi, mudah dibaca, dan data di dalamnya bisa digunakan berulang kali.
        </p>

        <div className="flex justify-between">
          <button
            onClick={handleBackToSyntax}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition text-base"
          >
            ← Materi Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="bg-violet-600 text-white px-6 py-3 rounded-full hover:bg-violet-700 transition text-base"
          >
            Lanjut ke Operator →
          </button>
        </div>
      </div>
    </div>
  );
}