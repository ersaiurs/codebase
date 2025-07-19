'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Di halaman complete
import { useSearchParams } from 'next/navigation';


export default function CompletePage() {
  const router = useRouter();

  const restartGame = () => {
    router.push('/games/puzzle/wordsearch');
  };

  const handleBackClick = () => {
    router.back();
  };

  const searchParams = useSearchParams();
const time = searchParams.get('time');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </button>

      <div className="bg-white border shadow-md rounded-lg w-full max-w-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">🎉 Cari Kata Selesai!</h2>
        <p className="text-sm text-gray-600 mb-4">
          Kamu berhasil menyelesaikan level ini! 🚀
        </p>

        <Link
          href="/games/select"
          className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Kembali ke Pilihan Permainan
        </Link>

        <button
          onClick={restartGame}
          className="inline-block mt-4 ml-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          🔁 Mulai Ulang
        </button>
      </div>
    </div>
  );
}
