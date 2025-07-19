'use client';

import { useRouter } from 'next/navigation';

export default function LearningPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-violet-200 text-center">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-violet-700 text-3xl hover:text-violet-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      <h1 className="text-4xl font-bold text-violet-700 mb-6">📘 Materi Pembelajaran</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-10">
        Pelajari dasar-dasar algoritma dan pemrograman melalui berbagai topik yang disusun secara bertahap. 🚀
      </p>

      {/* Card Materi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {[
          { title: '🧠 Pengenalan JavaScript', path: '/learning/intro' },
          { title: '📦 Sintaks Dasar', path: '/learning/syntax' },
          { title: '💡 Variabel & Tipe Data', path: '/learning/variables' },
          { title: '🛠️ Operator', path: '/learning/operators' },
          { title: '🔁 Percabangan & Perulangan', path: '/learning/conditionals' },
          { title: '🔍 Fungsi & Array', path: '/learning/function' },
        ].map((lesson) => (
          <div
            key={lesson.title}
            onClick={() => router.push(lesson.path)}
            className="bg-white text-left rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition transform duration-300"
          >
            <h2 className="text-xl font-semibold text-violet-700">{lesson.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Klik untuk mulai belajar</p>
          </div>
        ))}
      </div>
    </div>
  );
}
