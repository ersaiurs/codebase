'use client';
import { useRouter } from 'next/navigation';

export default function QuizIntroPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/games/quiz/select');
  };

  const handleBack = () => {
    router.push('/games/select');
  };

  const handleLearn = () => {
    router.push('/learning');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 bg-gradient-to-br from-orange-100 to-orange-100">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-orange-700 text-3xl hover:text-orange-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-300 max-w-xl w-full px-8 py-10 text-center">
        <h1 className="text-3xl font-bold text-orange-700 mb-6">📘 Petunjuk Quiz</h1>

        <ul className="text-base text-gray-700 space-y-3 text-left">
          <li>✅ Total 5 level dan 5 pertanyaan yang bisa dimainkan</li>
          <li>Level 1-2: Dasar sintaks, variabel, operator.</li>
          <li>Level 3: Percabangan.</li>
          <li>Level 4: Perulangan.</li>
          <li>Level 5: Fungsi dan Array.</li>
          <li>🕒 Setiap soal memiliki batas waktu 30 detik</li>
          <li>⏭️ Waktu habis = otomatis lanjut ke soal berikutnya</li>
          <li>🎯 Kerjakan dengan teliti untuk mendapatkan skor maksimal</li>
        </ul>

        {/* Dua tombol berdampingan */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleLearn}
            className="w-full sm:w-1/2 bg-white border border-orange-600 text-orange-700 font-semibold px-6 py-3 rounded-full hover:bg-orange-50 transition"
          >
            📖 Pelajari Materi
          </button>
          <button
            onClick={handleStart}
            className="w-full sm:w-1/2 bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition"
          >
            Mulai Quiz →
          </button>
        </div>
      </div>
    </div>
  );
}
