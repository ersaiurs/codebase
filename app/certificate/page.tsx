'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Certificate from '@/components/Certificate';
import Link from 'next/link';

export default function CompletePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      setUserName(user.displayName || user.email || 'Peserta');

      const userRef = doc(getFirestore(), 'users', user.uid);
      const snapshot = await getDoc(userRef);
      const data = snapshot.data();
      const progress = data?.progress || {};

      const completedAll =
        progress.level1 &&
        progress.level2 &&
        progress.level3 &&
        progress.level4 &&
        progress.level5 &&
        progress.wordsearch &&
        progress.jsmatch;

      setIsCompleted(completedAll);
      setCheckingProgress(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/certificate-wordsearch.pdf'; // Ganti path jika perlu
    link.download = 'certificate-wordsearch.pdf';
    link.click();
  };

  if (checkingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        ⏳ Memeriksa progres permainan...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white-200 to-white-200 p-6 flex flex-col items-center justify-center text-center">
      {/* Tombol kembali kiri atas */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </Link>

      {isCompleted ? (
        <>
          <h1 className="text-4xl font-bold text-blue-800 mb-4">🎉 Selamat!</h1>
          <p className="text-lg text-blue-700 mb-6">
            Kamu telah menyelesaikan semua permainan edukatif tentang JavaScript!
          </p>

          {userName ? (
            <Certificate name={userName} competition="Semua Permainan JavaScript" />
          ) : (
            <p className="text-gray-500">Memuat sertifikat...</p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            >
              📄 Unduh Sertifikat
            </button>

            <button
              onClick={() => router.push('/games/select')}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
            >
              🔙 Kembali ke Pilihan Permainan
            </button>
          </div>
        </>
      ) : (
        <div className="max-w-md mt-[-40px]">
          <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Sertifikat Belum Tersedia</h1>
          <p className="text-lg text-gray-700 mb-3">
            Kamu belum menyelesaikan semua permainan yang diperlukan.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Selesaikan quiz level 1-5, cari kata, dan mencocokkan jawaban untuk mendapatkan sertifikat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/games/select"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              🎮 Kembali ke Permainan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
