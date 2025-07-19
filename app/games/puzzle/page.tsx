'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function puzzleIntroPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [canAccessPuzzle, setCanAccessPuzzle] = useState(false);

  useEffect(() => {
    const checkQuizProgress = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        router.push('/login'); // redirect ke login jika belum login
        return;
      }

      const userRef = doc(getFirestore(), 'users', user.uid);
      const snapshot = await getDoc(userRef);
      const progress = snapshot.data()?.progress || {};

      const quizDone = progress.level1 && progress.level2 && progress.level3 && progress.level4 && progress.level5;

      setCanAccessPuzzle(quizDone);
      setIsLoading(false);
    };

    checkQuizProgress();
  }, [router]);

  const handleStart = () => {
    if (!canAccessPuzzle) {
      alert('❗Anda harus menyelesaikan semua quiz level 1-5 sebelum bermain Puzzle.');
      return;
    }

    router.push('/games/puzzle/wordsearch');
  };

  const handleBack = () => {
    router.push('/games/select');
  };

  const handleLearn = () => {
    router.push('/learning');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        ⏳ Memeriksa akses Puzzle...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 bg-gradient-to-br from-green-100 to-green-100">
      {/* Tombol Kembali */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-green-800 text-3xl hover:text-green-900 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-green-300 max-w-xl w-full px-8 py-10 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">🧩 Petunjuk Cari Kata</h1>

        <ul className="text-base text-gray-700 space-y-3 text-left">
          <li>🔍 Temukan kata-kata tersembunyi dalam grid huruf</li>
          <li>🖱️ Seret huruf untuk membentuk kata</li>
          <li>🎯 Fokus pada kata seputar JavaScript</li>
          <li>📚 Cocok untuk melatih konsentrasi dan ingatan</li>
        </ul>

        {/* Dua tombol berdampingan */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleLearn}
            className="w-full sm:w-1/2 bg-white border border-green-600 text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition"
          >
            📖 Pelajari Materi
          </button>
          <button
            onClick={handleStart}
            className="w-full sm:w-1/2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            Mulai Cari Kata →
          </button>
        </div>
      </div>
    </div>
  );
}
