'use client';
import { useRouter } from 'next/navigation';

export default function JSMatchIntroPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/games/jsmatch/match'); // arahkan ke route game matching sesuai struktur foldermu
  };

  const handleBack = () => {
    router.push('/games/select');
  };

  const handleLearn = () => {
    router.push('/learning'); // arahkan ke materi sesuai projectmu
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 bg-gradient-to-br from-violet-100 to-pink-100">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-violet-800 text-3xl hover:text-violet-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-violet-300 max-w-xl w-full px-8 py-10 text-center">
        <h1 className="text-3xl font-bold text-violet-700 mb-6">🧠 Petunjuk Mencocokan Jawaban</h1>

        <ul className="text-base text-gray-700 space-y-3 text-left">
          <li>📝 Cocokkan perulangan dengan deskripsi yang benar</li>
          <li>🖱️ Drag dan drop deskripsi ke kotak perulangan</li>
          <li>⏳ Hati-hati, kamu hanya punya 3 kesempatan</li>
          <li>🎯 Melatih ketelitian dan pemahaman apa itu perulangan</li>
        </ul>

        {/* Dua tombol berdampingan */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleLearn}
            className="w-full sm:w-1/2 bg-white border border-violet-600 text-violet-700 font-semibold px-6 py-3 rounded-full hover:bg-violet-50 transition"
          >
            📖 Pelajari Materi
          </button>
          <button
            onClick={handleStart}
            className="w-full sm:w-1/2 bg-violet-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-violet-700 transition"
          >
            Mulai Permainan →
          </button>
        </div>
      </div>
    </div>
  );
}
