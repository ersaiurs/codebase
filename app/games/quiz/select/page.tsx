'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const levels = [1, 2, 3, 4, 5];

const QuizPage = () => {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      const db = getFirestore();
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const progress = userData.progress || {};
        const scoresFromDb = userData.scores || {};

        let highestLevel = 1;
        levels.forEach((level) => {
          if (progress[`level${level}`]) {
            highestLevel = level + 1;
          }
        });

        const numericScores: { [key: string]: number } = {};
        Object.keys(scoresFromDb).forEach((key) => {
          numericScores[key] = Number(scoresFromDb[key]);
        });

        setUnlockedLevel(Math.min(highestLevel, levels.length));
        setScores(numericScores);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-indigo-100 to-blue-100 text-blue-600 py-12 px-6">
      
      {/* Tombol Kembali */}
      <Link 
        href="/games/quiz" 
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </Link>

      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Tantangan Quiz Interaktif</h1>
        <p className="text-lg mb-10">Pilih level dimulai dari level 1 dan naikkan skor kamu! 🎯</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-center">
          {levels.map((level) => {
            const isUnlocked = level <= unlockedLevel;
            const score = scores[`level${level}`];

            return (
              <div
                key={level}
                className={`relative rounded-2xl p-6 shadow-xl transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-white text-blue-600 hover:scale-105 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <h2 className="text-2xl font-bold mb-2 text-center">Level {level}</h2>
                
                {score !== undefined && (
                  <p className="text-sm text-center text-green-600 font-semibold mb-2">
                    Skor Terakhir: {score} / 5
                  </p>
                )}

                {isUnlocked ? (
                  <Link
                    href={`/games/quiz/level${level}`}
                    className="block mt-2 text-center text-sm font-semibold underline"
                  >
                    Mulai Level
                  </Link>
                ) : (
                  <div className="text-center text-sm mt-4">🔒 Terkunci</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
