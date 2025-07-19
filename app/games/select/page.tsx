'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const GameSelectionPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleResetAll = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(getFirestore(), 'users', user.uid);
    await setDoc(
      userRef,
      {
        progress: {}, // menghapus semua progress
      },
      { merge: true }
    );

    setShowModal(false);
    alert('✅ Semua progress permainan telah direset.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-100 via-white-100 to-blue-100 relative">
      {/* Tombol Kembali */}
      <Link 
        href="/games" 
        className="absolute top-4 left-4 text-blue-600 text-3xl hover:text-blue-800 transition-transform hover:-translate-x-1"
      >
        &lt;
      </Link>

      {/* Judul */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center drop-shadow-md">
        🎮 Pilih Permainan CodeBase
      </h1>

      {/* Kartu Permainan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Game Card 1 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-orange-700">🧠 Permainan Quiz</h2>
          <p className="text-gray-700 mb-4">
             Latih logika dan pemahaman coding melalui soal interaktif yang seru dan mendidik.
          </p>
          <Link 
            href="/games/quiz" 
            className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 font-semibold"
          >
            Main Quiz
          </Link>
        </div>

        {/* Game Card 2 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-green-700">🧩 Cari Kata</h2>
          <p className="text-gray-700 mb-4">
            Asah kemampuan logika dan konsentrasi dengan permainan teka-teki kata seputar JavaScript.
          </p>
          <Link 
            href="/games/puzzle" 
            className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 font-semibold"
          >
            Main Cari Kata
          </Link>
        </div>

        {/* Game Card 3 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-purple-700">🧱 Mencocokkan Jawaban</h2>
          <p className="text-gray-700 mb-4">
            Drag and match! Belajar perulangan melalui game interaktif dan visual menarik.
          </p>
          <Link 
            href="/games/jsmatch" 
            className="mt-6 bg-purple-500 text-white px-5 py-2 rounded-full hover:bg-purple-600 font-semibold"
          >
            Main Mencocokkan Jawaban
          </Link>
        </div>
      </div>

      {/* Tombol Reset Semua Permainan */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-10 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 font-semibold shadow-lg"
      >
        🔄 Reset Semua Permainan
      </button>

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Reset</h2>
            <p className="mb-6">Yakin reset semua? Data permainanmu akan terhapus semua.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleResetAll}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Ya, Reset
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSelectionPage;
